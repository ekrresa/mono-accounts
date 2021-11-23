import { AccountModel } from './account.model';
import { Account } from './account.schema';

export async function saveAccount(account: Account) {
	return await AccountModel.create(account);
}
