import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { User } from '../modules/user/user.schema';

export async function createSecurityTokens(payload: Partial<User>) {
	const userData = {
		..._.omit(payload, ['id', 'access_token_secret', 'refresh_token_secret']),
		userId: payload.id,
	};

	const accessToken = jwt.sign(userData, payload.access_token_secret!, {
		expiresIn: '5m',
	});

	const refreshToken = jwt.sign(userData, payload.refresh_token_secret!, {
		expiresIn: '24h',
	});

	return { accessToken, refreshToken };
}
