import { useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from '../../utils/request';
import { Account, ApiResponse, Transaction, TransactionsQuery } from '../../types/app';

export const accountsKeyFactory = {
	accounts: () => ['accounts'] as const,
	transactions: (accountId: string, transactionsQuery: TransactionsQuery) => [
		...accountsKeyFactory.accounts(),
		'transactions',
		{ accountId, ...transactionsQuery },
	],
};

const THREE_HOURS_IN_MILLISECONDS = 10_800_000;

export function useAccounts(userId: string, selectFn?: (response: Account[]) => number) {
	return useQuery<AxiosResponse<ApiResponse<Account[]>>, AxiosError, Account[] | number>(
		accountsKeyFactory.accounts(),
		() => axiosInstance.get(`accounts/user/${userId}`),
		{
			enabled: Boolean(userId),
			select: selectFn ? response => selectFn(response.data.data) : response => response.data.data,
			staleTime: THREE_HOURS_IN_MILLISECONDS,
		}
	);
}

export function useAccountTransactions(accountId: string, transactionsQuery: TransactionsQuery) {
	const queryParams = new URLSearchParams(transactionsQuery).toString();
	return useQuery<AxiosResponse<ApiResponse<Transaction>>, AxiosError, Transaction>(
		accountsKeyFactory.transactions(accountId, transactionsQuery),
		() => axiosInstance.get(`accounts/${accountId}/transactions?${queryParams}`),
		{
			enabled: Boolean(accountId),
			refetchOnWindowFocus: true,
			select: response => response.data.data,
			staleTime: THREE_HOURS_IN_MILLISECONDS,
		}
	);
}
