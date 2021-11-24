import { AccountModel } from './account.model';
import { Account, AccountInfo } from './account.schema';

export async function checkIfAccountExists(accountId: string) {
	return await AccountModel.exists({ account_id: accountId });
}

export async function saveAccount(account: Account & AccountInfo) {
	return await AccountModel.create(account);
}

export async function getAccount(accountId: string) {
	return await AccountModel.findOne({ account_id: accountId }).lean();
}

export async function getUserAccounts(userId: string) {
	return await AccountModel.find({ user_id: userId }).select('-bvn').lean();
}

export async function deleteAccount(accountId: string) {
	return await AccountModel.findOneAndDelete({ account_id: accountId }).lean();
}
