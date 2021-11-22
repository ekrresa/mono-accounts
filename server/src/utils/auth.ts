import jwt from 'jsonwebtoken';
import { User } from '../modules/user/user.schema';

export async function createTokens(user: User) {
	const accessToken = jwt.sign({ id: user.id }, user.access_token_secret, {
		expiresIn: '5m',
	});

	const refreshToken = jwt.sign({ id: user.id }, user.access_token_secret, {
		expiresIn: '24h',
	});

	return { accessToken, refreshToken };
}
