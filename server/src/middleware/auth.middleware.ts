import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { getUser } from '../modules/user/user.repository';
import { createSecurityTokens, session, setLoggedInUser } from '../modules/user/user.utils';

interface JwtAuthPayload {
	user_id: string;
	first_name: string;
}

export async function ensureUserIsAuthenticated(req: Request, res: Response, next: NextFunction) {
	const token = getAccessToken(req);
	const refreshToken = getRefreshToken(req);

	if (!token || !refreshToken) {
		throw new Unauthorized('Please login');
	}

	const userData = jwt.decode(token) as JwtAuthPayload | null;

	if (!userData) {
		throw new Unauthorized('Please login');
	}

	const user = await getUser(userData.user_id);

	if (!user) {
		throw new Unauthorized('Please login');
	}

	jwt.verify(token, user.access_token_secret, async (err, payload) => {
		if (err && err.name === 'TokenExpiredError') {
			// validate refresh token first
			try {
				jwt.verify(refreshToken, user.refresh_token_secret);
			} catch (error) {
				throw new Unauthorized('Please login');
			}

			const securityPayload = _.pick(user, [
				'id',
				'first_name',
				'access_token_secret',
				'refresh_token_secret',
			]);
			const userToken = await createSecurityTokens(securityPayload);

			res.set('x-access-token', userToken.accessToken);
			res.set('x-refresh-token', userToken.refreshToken);
		}

		if (err && err.name !== 'TokenExpiredError') {
			throw new Unauthorized('Please login');
		}

		session.run(() => {
			setLoggedInUser(payload as JwtAuthPayload);
			next();
		});
	});
}

function getAccessToken(req: Request) {
	if (req.headers.authorization) {
		const parts = req.headers.authorization.split(' ');

		if (parts.length !== 2) {
			return null;
		}

		const [scheme, token] = parts;

		if (/^Bearer$/i.test(scheme)) {
			return token;
		}
	}

	return null;
}

function getRefreshToken(req: Request) {
	return req.headers['x-refresh-token'] as string | undefined;
}
