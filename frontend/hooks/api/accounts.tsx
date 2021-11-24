import { useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { axiosInstance } from '../../utils/request';
import { Account, ApiResponse } from '../../types/app';

export const accountsKeyFactory = {
	accounts: () => ['accounts'],
};

export function useAccounts(userId: string, selectFn?: (response: Account[]) => number) {
	return useQuery<AxiosResponse<ApiResponse<Account[]>>, AxiosError, Account[] | number>(
		accountsKeyFactory.accounts(),
		() => axiosInstance.get(`accounts/user/${userId}`),
		{
			enabled: Boolean(userId),
			select: selectFn ? response => selectFn(response.data.data) : response => response.data.data,
		}
	);
}
