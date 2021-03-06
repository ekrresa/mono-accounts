import { Request } from 'express';
import * as UserService from './user.service';
import { ApiResponse } from '../../types';
import { createSecurityTokens } from './user.utils';

export async function loginHandler(req: Request, res: ApiResponse) {
	const result = await UserService.login(req.body);
	const userToken = await createSecurityTokens(result);

	res.set('x-access-token', userToken.accessToken);
	res.set('x-refresh-token', userToken.refreshToken);

	res.status(200).json({ status: 200, message: 'user logged in successfully' });
}

export async function signUpHandler(req: Request, res: ApiResponse) {
	const result = await UserService.signUp(req.body);
	const userToken = await createSecurityTokens(result);

	res.set('x-access-token', userToken.accessToken);
	res.set('x-refresh-token', userToken.refreshToken);

	res.status(201).json({ status: 201, message: 'user registered successfully' });
}

export async function deleteAccountHandler(_req: Request, res: ApiResponse) {
	await UserService.deleteAccount();

	res.status(200).json({ status: 200, message: 'account deleted successfully' });
}
