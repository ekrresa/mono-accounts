import { Request } from 'express';
import * as AccountService from './account.service';
import { ApiResponse } from '../../types';

export async function linkAccountHandler(req: Request, res: ApiResponse) {
	await AccountService.linkAccount(req.body);

	res.status(200).json({ status: 200, message: 'account has been linked' });
}

export async function getUserAccountsHandler(req: Request, res: ApiResponse) {
	const userAccounts = await AccountService.getUserAccounts(req.params.user_id);

	res.status(200).json({ status: 200, message: 'user accounts fetched', data: userAccounts });
}

export async function getAccountTransactionsHandler(req: Request, res: ApiResponse) {
	const transactions = await AccountService.fetchAccountTransactions(
		req.params.account_id,
		req.query
	);

	res
		.status(200)
		.json({ status: 200, message: 'transactions fetched successfully', data: transactions });
}

export async function unlinkAccountHandler(req: Request, res: ApiResponse) {
	await AccountService.unlinkAccount(req.params.account_id);

	res.status(200).json({ status: 200, message: 'account deleted' });
}
