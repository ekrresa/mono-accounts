import { NextFunction, Request, Response } from 'express';
import { Forbidden, Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { getUser } from '../modules/user/user.repository';
import { UserSecrets } from '../modules/user/user.schema';
import {
	createSecurityTokens,
	getLoggedInUser,
	session,
	setLoggedInUser,
} from '../modules/user/user.utils';
import * as Cache from '../utils/cache';

interface JwtAuthPayload {
	user_id: string;
	first_name: string;
}

export async function ensureUserIsAuthenticated(req: Request, res: Response, next: NextFunction) {
	let accessToken;
	const refreshToken = req.headers['x-refresh-token'] as string | undefined;

	if (req.headers.authorization) {
		accessToken = req.headers.authorization.split(' ')[1];
	}

	if (!accessToken || !refreshToken) {
		throw new Unauthorized('Please login');
	}

	const tokenPayload = jwt.decode(accessToken) as JwtAuthPayload | null;
	if (!tokenPayload) {
		throw new Unauthorized('Please login');
	}

	let userSecrets = await Cache.getFromCache<UserSecrets>(`user:${tokenPayload.user_id}`);

	if (!userSecrets) {
		const user = await getUser(tokenPayload.user_id);
		if (!user) {
			throw new Unauthorized('Please login');
		}

		userSecrets = _.pick(user, ['access_token_secret', 'refresh_token_secret']);
	}

	jwt.verify(accessToken, userSecrets.access_token_secret, async err => {
		if (err && err.name === 'TokenExpiredError') {
			// validate refresh token first
			try {
				jwt.verify(refreshToken, userSecrets.refresh_token_secret);
			} catch (error) {
				throw new Unauthorized('Please login4');
			}

			const securityPayload = {
				...{ id: tokenPayload.user_id, first_name: tokenPayload.first_name },
				...userSecrets,
			};

			const userToken = await createSecurityTokens(securityPayload);

			res.set('x-access-token', userToken.accessToken);
		}

		if (err && err.name !== 'TokenExpiredError') {
			throw new Unauthorized('Please login');
		}

		session.run(() => {
			setLoggedInUser(_.pick(tokenPayload, ['first_name', 'user_id']));
			next();
		});
	});
}

// ensures the request is coming from the user and not a third party.
export async function ensureUserAuthority(req: Request, _res: Response, next: NextFunction) {
	const currentUser = getLoggedInUser();

	if (!currentUser) {
		throw new Forbidden('Please login');
	}

	if (currentUser.user_id !== req.params.user_id) {
		throw new Forbidden('No permissions to make this request');
	}

	next();
}
