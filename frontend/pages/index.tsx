import { ComponentType, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { format } from 'date-fns';

import { accountsKeyFactory, useAccounts, useAccountTransactions } from '../hooks/api/accounts';
import { apiMutationHandler } from '../hooks/api/mutation';
import { useAppSelector } from '../hooks/redux';
import { DASHBOARD } from '../constants/routes';
import { useMonoWidget } from '../hooks/useMonoWidget';
import { Layout } from '../components/Layout';
import { formatAmount, getBankInitials, getGreeting } from '../utils';
import { Account } from '../types/app';
import LogoLight from '../public/images/logo-light.svg';

function getTotalBalance(accounts: Account[]) {
	return accounts.reduce((total, account) => {
		return (total += account.balance);
	}, 0);
}

export default function Home() {
	const queryClient = useQueryClient();
	const auth = useAppSelector(state => state.auth);
	const totalBalance = useAccounts(auth.user_id, getTotalBalance);
	const userAccounts = useAccounts(auth.user_id);
	const { authCode, openMonoWidget } = useMonoWidget();
	const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
	const transactions = useAccountTransactions(selectedAccount?.account_id!, { limit: '7' });

	const linkAccountRequest = useMutation((payload: any) =>
		apiMutationHandler({ url: '/accounts/link', body: payload, method: 'POST' })
	);
	const unlinkAccountRequest = useMutation((payload: any) =>
		apiMutationHandler({ url: `/accounts/${payload.accountId}`, method: 'DELETE' })
	);

	useEffect(() => {
		if (userAccounts.data && Array.isArray(userAccounts.data) && !selectedAccount) {
			setSelectedAccount(userAccounts.data[0]);
		}
	}, [selectedAccount, userAccounts.data]);

	useEffect(() => {
		if (authCode) {
			linkAccountRequest.mutate(
				{ account_code: authCode, user_id: auth.user_id },
				{
					onError: (err: any) => {
						console.log(err.response);
					},
					onSuccess: async () => {
						//Display toasts
						await queryClient.invalidateQueries(accountsKeyFactory.accounts());
					},
				}
			);
		}
	}, [authCode]);

	const deleteAccount = (accountId: string = '') => {
		// Prompt user to confirm unlinking
		if (accountId) {
			unlinkAccountRequest.mutate(
				{ accountId },
				{
					onError: (err: any) => {
						console.log(err.response);
					},
					onSuccess: async () => {
						//Display toasts
						await queryClient.invalidateQueries(accountsKeyFactory.accounts());
					},
				}
			);
		}
	};

	return (
		<section className="flex-1 grid grid-cols-dash">
			<section className="px-12 pt-10 text-black-200">
				<div className="flex items-center justify-between">
					<div className="font-normal text-black-200">
						{getGreeting()}, {auth.first_name}
					</div>
					<button className="border border-gray-200 flex items-center shadow px-2 py-1 rounded text-sm text-black-200">
						Today
						<FiCalendar className="ml-2 text-lg" />
					</button>
				</div>

				<h2 className="font-medium mt-10 text-xl text-center">
					Expense Tracker ({selectedAccount?.institution.name})
				</h2>
				<div className="border border-gray-300 h-52 mt-6 rounded"></div>

				<div className="border-b border-gray-300 flex items-center justify-between mt-14 mb-4 pb-2 text-xl">
					<h2>Latest Transactions</h2>
					<button>
						<IoEllipsisHorizontalSharp className="text-2xl" color="#D8D8D8" />
					</button>
				</div>

				{transactions.data?.data.map(transaction => (
					<div key={transaction._id} className="mb-4">
						<div className="font-medium flex items-center justify-between text-black-200">
							<span className="max-w-sm truncate">{transaction.narration}</span>
							<span>{formatAmount(transaction.balance / 100)}</span>
						</div>
						<div className="font-extralight mt-1 text-black-300 text-[0.9rem] tracking-wider flex items-center opacity-50">
							<span>{format(new Date(transaction.date), 'dd-MM-yyyy')}</span>
							<BsDot className="text-xl w-4" />
							<span>{format(new Date(transaction.date), 'h:mm aaa')}</span>
							<BsDot className="text-xl w-4" />
							<span className="capitalize">{transaction.type}</span>
						</div>
					</div>
				))}

				<div className="flex items-center justify-center font-extralight mt-8 mb-4 text-sm">
					VIEW ALL <MdOutlineKeyboardArrowRight className="ml-[0.1rem]" />
				</div>
			</section>

			<section className="bg-white-sky px-12 pt-10 text-center text-black-200">
				<div className="bg-white rounded-[10px] px-6 pt-8 pb-6 shadow-md">
					<p className="font-medium text-lg">TOTAL BALANCE</p>
					{totalBalance.data && (
						<p className="font-semibold mt-4 text-5xl">
							{formatAmount(Number(totalBalance.data) / 100, 0)}
						</p>
					)}

					<p className="font-extralight mt-1 opacity-70 tracking-wider">
						Your balance across all Banks
					</p>

					<div className="my-10 flex items-center justify-center">
						<div className="flex items-center mr-2">
							{userAccounts.data &&
								Array.isArray(userAccounts.data) &&
								userAccounts.data.map(account => (
									<button
										key={account.id}
										className={`border-gray-200 flex items-center -ml-2 first:ml-0 justify-center h-8 w-8 rounded-full text-sm ${
											selectedAccount?.account_id === account.account_id
												? 'bg-black-200 text-white relative'
												: 'bg-white border text-black-200'
										}`}
										onClick={() => setSelectedAccount(account)}
									>
										{getBankInitials(account.institution.name)}
									</button>
								))}
						</div>
						<button
							className="border border-gray-200 flex items-center justify-center h-9 w-9 rounded-full"
							onClick={openMonoWidget}
						>
							<AiOutlinePlus className="text-xl" color="#D0D0D0" />
						</button>
					</div>

					<button
						className="bg-red-100 font-medium px-6 py-4 rounded-xl tracking-wider text-red"
						onClick={() => {
							deleteAccount(selectedAccount?.account_id);
						}}
					>
						UNLINK BANK ACCOUNT
					</button>
				</div>
			</section>
		</section>
	);
}

Home.getLayout = (page: ComponentType) => <Layout>{page}</Layout>;
