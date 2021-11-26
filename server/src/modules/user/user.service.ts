import * as bcrypt from 'bcrypt';
import { BadRequest, Unauthorized } from 'http-errors';
import _ from 'lodash';

import * as UserRepo from './user.repository';
import * as AccountRepo from '../account/account.repository';
import { LoginInput, UserInput, UserSecrets } from './user.schema';
import { generateRandomString, generateUserId } from '../../utils';
import * as Cache from '../../utils/cache';
import { getLoggedInUser } from './user.utils';

export async function refreshUserSecrets(userId: string) {
	const accessTokenSecretPromise = generateRandomString();
	const refreshTokenSecretPromise = generateRandomString();

	const [accessTokenSecret, refreshTokenSecret] = await Promise.all([
		accessTokenSecretPromise,
		refreshTokenSecretPromise,
	]);

	return await UserRepo.updateUser(userId, {
		access_token_secret: accessTokenSecret,
		refresh_token_secret: refreshTokenSecret,
	});
}

export async function login(loginInput: LoginInput) {
	const user = await UserRepo.getUserByEmail(loginInput.email);

	if (!user) {
		throw new BadRequest('Invalid email or password');
	}

	const isPasswordCorrect = await bcrypt.compare(loginInput.password, user.password);

	if (!isPasswordCorrect) {
		throw new Unauthorized('Invalid email or password');
	}

	const payload = _.pick(user, ['id', 'first_name', 'access_token_secret', 'refresh_token_secret']);

	cacheUserSecrets(payload.id, {
		access_token_secret: payload.access_token_secret,
		refresh_token_secret: payload.refresh_token_secret,
	});

	return payload;
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
	cacheUserSecrets(userId, {
		access_token_secret: accessTokenSecret,
		refresh_token_secret: refreshTokenSecret,
	});

	return _.pick(user, ['id', 'first_name', 'access_token_secret', 'refresh_token_secret']);
}

export async function deleteAccount(userId: string) {
	const user = await UserRepo.getUser(userId);
	const currentUser = getLoggedInUser();

	if (!user) {
		throw new BadRequest('user does not exist');
	}

	if (user.id !== currentUser.user_id) {
		throw new Unauthorized('unauthorized action');
	}

	await UserRepo.deleteUser(userId);
	await AccountRepo.deleteUserAccounts(userId);
}

export async function cacheUserSecrets(userId: string, secrets: UserSecrets) {
	await Cache.addToCache(`user:${userId}`, secrets);
}
