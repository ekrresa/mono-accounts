import * as bcrypt from 'bcrypt';
import { BadRequest, Unauthorized } from 'http-errors';
import _ from 'lodash';

import * as UserRepo from './user.repository';
import { LoginInput, UserInput } from './user.schema';
import { generateRandomString, generateUserId } from '../../utils';

export async function login(loginInput: LoginInput) {
	const user = await UserRepo.getUserByEmail(loginInput.email);

	if (!user) {
		throw new BadRequest('Invalid email or password');
	}

	const isPasswordCorrect = await bcrypt.compare(loginInput.password, user.password);

	if (!isPasswordCorrect) {
		throw new Unauthorized('Invalid email or password');
	}

	return _.pick(user, ['id', 'access_token_secret', 'refresh_token_secret']);
}

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

	const user = _.merge(userInput, {
		id: userId,
		password,
		last_login: new Date(),
		access_token_secret: accessTokenSecret,
		refresh_token_secret: refreshTokenSecret,
	});

	await UserRepo.createUser(user);
	return _.pick(user, ['id', 'access_token_secret', 'refresh_token_secret']);
}
