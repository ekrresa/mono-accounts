import axios from 'axios';
import { BadRequest } from 'http-errors';

import * as AccountRepo from './account.repository';
import { AccountInput } from './account.schema';
import { axiosInstance } from '../../utils/request';
import { generateUserId } from '../../utils';

export async function linkAccount(input: AccountInput) {
	try {
		const result = await axiosInstance.post('/account/auth', { code: input.account_code });
		const id = await generateUserId();

		await AccountRepo.saveAccount({
			id,
			account_id: result.data.id,
			user_id: input.user_id,
		});
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new BadRequest(error.response?.data.message || error.message);
		} else if (error instanceof Error) {
			throw new BadRequest(error.message);
		}
	}
}
