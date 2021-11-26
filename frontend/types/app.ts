import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type Page<P = {}> = NextPage<P> & {
	getLayout?: (page: ReactElement) => ReactNode;
	protected?: boolean;
};

export type ApiResponse<T> = {
	status: number;
	message: string;
	data: T;
};

export type Account = {
	id: string;
	user_id: string;
	account_id: string;
	name: string;
	currency: string;
	type: string;
	accountNumber: string;
	balance: number;
	institution: {
		name: string;
		bankCode: string;
		type: string;
	};
};

export type Transaction = {
	paging: {
		total: number;
		page: number;
		previous: string | null;
		next: string;
	};
	data: Array<{
		_id: string;
		type: 'credit' | 'debit';
		amount: number;
		narration: string;
		date: string;
		balance: number;
	}>;
};

export type TransactionsQuery = {
	limit?: string;
	type?: 'credit' | 'debit';
	start?: string;
	end?: string;
};
