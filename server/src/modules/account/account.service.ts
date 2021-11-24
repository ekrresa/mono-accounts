import { BadRequest } from 'http-errors';

import * as AccountRepo from './account.repository';
import { AccountInput } from './account.schema';
import { axiosInstance } from '../../utils/request';
import { generateUserId } from '../../utils';

export async function linkAccount(input: AccountInput) {
	const result = await axiosInstance.post('/account/auth', { code: input.account_code });
	const accountId = result.data.id;

	const id = await generateUserId();
	const accountExists = await AccountRepo.checkIfAccountExists(accountId);

	if (accountExists) {
		throw new BadRequest('Account already exists');
	}

	await AccountRepo.saveAccount({
		id,
		account_id: result.data.id,
		user_id: input.user_id,
	});
}
