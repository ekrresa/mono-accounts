import { createNamespace } from 'cls-hooked';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { UserSession } from './user.schema';
import { User } from './user.schema';

export async function createSecurityTokens(payload: Partial<User>) {
	const userData = {
		..._.omit(payload, ['id', 'access_token_secret', 'refresh_token_secret']),
		user_id: payload.id,
	};

	const accessToken = jwt.sign(userData, payload.access_token_secret!, {
		expiresIn: '5m',
	});

	const refreshToken = jwt.sign(userData, payload.refresh_token_secret!, {
		expiresIn: '24h',
	});

	return { accessToken, refreshToken };
}

// This module sets up a session to keep info about a loggedIn user
// throughout the lifetime of a request
export const session = createNamespace('user-session');
const LOGGED_IN_USER = 'loggedInUser';

export function setLoggedInUser(payload: UserSession) {
	session.set(LOGGED_IN_USER, payload);
}

export function getLoggedInUser(): UserSession {
	return session.get(LOGGED_IN_USER);
}
