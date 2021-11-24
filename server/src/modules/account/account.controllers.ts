import { Request } from 'express';
import * as AccountService from './account.service';
import { ApiResponse } from '../../types';

export async function loginAccountHandler(req: Request, res: ApiResponse) {
	await AccountService.linkAccount(req.body);

	res.status(200).json({ status: 200, message: 'account has been linked' });
}
