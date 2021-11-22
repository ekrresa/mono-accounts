import bcrypt from 'bcrypt';
import { BadRequest } from 'http-errors';

import * as UserRepo from './user.repository';
import { User, UserInput } from './user.schema';
import { generateRandomString, generateUserId } from '../../utils';

export async function signUp(userInput: UserInput) {
	const userExists = await UserRepo.checkIfUserExists(userInput.email);

	if (userExists) {
		throw new BadRequest(`user with email ${userInput.email} already exists`);
	}

	const userIdPromise = generateUserId();
	const passwordPromise = bcrypt.hash(userInput.password, 10);
	const accessTokenSecretPromise = generateRandomString();
	const refreshTokenSecretPromise = generateRandomString();

	const [userId, password, accessTokenSecret, refreshTokenSecret] = await Promise.all([
		userIdPromise,
		passwordPromise,
		accessTokenSecretPromise,
		refreshTokenSecretPromise,
	]);

	const user: User = {
		...userInput,
		id: userId,
		password,
		last_login: new Date(),
		access_token_secret: accessTokenSecret,
		refresh_token_secret: refreshTokenSecret,
	};

	return await UserRepo.createUser(user);
}
