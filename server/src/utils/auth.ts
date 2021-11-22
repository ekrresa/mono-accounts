import jwt from 'jsonwebtoken';

export async function createSecurityTokens(
	userId: string,
	accessTokenSecret: string,
	refreshTokenSecret: string
) {
	const accessToken = jwt.sign({ id: userId }, accessTokenSecret, {
		expiresIn: '5m',
	});

	const refreshToken = jwt.sign({ id: userId }, refreshTokenSecret, {
		expiresIn: '24h',
	});

	return { accessToken, refreshToken };
}
