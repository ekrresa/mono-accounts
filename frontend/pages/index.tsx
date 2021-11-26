import { ComponentType, useEffect, useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/client';
import { format } from 'date-fns';

import { accountsKeyFactory, useAccounts, useAccountTransactions } from '../hooks/api/accounts';
import { apiMutationHandler } from '../hooks/api/mutation';
import { useMonoWidget } from '../hooks/useMonoWidget';
import { Layout } from '../components/Layout';
import { formatAmount, getBankInitials, getGreeting } from '../utils';
import { Account } from '../types/app';
import { Button } from '../components/Button';
import { Prompt } from '../components/Prompt';

function getTotalBalance(accounts: Account[]) {
	return accounts.reduce((total, account) => {
		return (total += account.balance);
	}, 0);
}

export default function Home() {
	const [session] = useSession();
	const queryClient = useQueryClient();
	const totalBalance = useAccounts(session?.user.user_id, getTotalBalance);
	const userAccounts = useAccounts(session?.user.user_id);
	const { authCode, openMonoWidget, setAuthCode } = useMonoWidget();
	const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const transactions = useAccountTransactions(selectedAccount?.account_id!, { limit: '7' });

	const linkAccountRequest = useMutation((payload: any) =>
		apiMutationHandler({ url: '/accounts/link', body: payload, method: 'POST' })
	);
	const unlinkAccountRequest = useMutation((payload: any) =>
		apiMutationHandler({ url: `/accounts/${payload.accountId}`, method: 'DELETE' })
	);

	const linkAccount = useCallback((code: string, userId: string) => {
		linkAccountRequest.mutate(
			{ account_code: code, user_id: userId },
			{
				onError: (err: any) => {
					setAuthCode('');
					toast.error(err?.response?.data.message || err.message);
				},
				onSuccess: async () => {
					setAuthCode('');
					toast.success('Your account has been linked!');
					await queryClient.invalidateQueries(accountsKeyFactory.accounts());
				},
			}
		);
	}, []);

	useEffect(() => {
		if (userAccounts.data && Array.isArray(userAccounts.data) && !selectedAccount) {
			setSelectedAccount(userAccounts.data[0]);
		}
	}, [selectedAccount, userAccounts.data]);

	useEffect(() => {
		if (authCode && session?.user.user_id) {
			linkAccount(authCode, session.user.user_id);
		}
	}, [authCode, linkAccount, session?.user.user_id]);

	const unlinkAccount = (accountId: string = '') => {
		if (!accountId) {
			toast.error(`It appears you haven't linked an account!`);
			return;
		}

		unlinkAccountRequest.mutate(
			{ accountId },
			{
				onError: (err: any) => {
					toast.error(err?.response?.data.message || err.message);
				},
				onSuccess: async () => {
					toast.success('Your account has been removed!');
					await queryClient.invalidateQueries(accountsKeyFactory.accounts());
					setIsOpen(false);
				},
			}
		);
	};

	return (
		<section className="bg-white-sky flex-1 grid grid-cols-1 mobile:grid-cols-dash">
			<section className="bg-white px-12 pt-10 text-black-200">
				<div className="flex items-center justify-center mobile:justify-between">
					<div className="hidden mobile:inline-block font-normal text-black-200">
						{getGreeting()}, <span className="capitalize">{session?.user.first_name}</span>
					</div>
					<button className="border border-gray-200 flex items-center shadow px-2 py-1 rounded text-sm text-black-200">
						Today
						<FiCalendar className="ml-2 text-lg" />
					</button>
				</div>

				<h2 className="font-medium mt-10 text-xl text-center">
					Expense Tracker{' '}
					{selectedAccount?.institution.name && `(${selectedAccount?.institution.name})`}
				</h2>
				<div className="border border-gray-300 h-52 mt-6 rounded"></div>

				<div className="border-b border-gray-300 flex items-center justify-between mt-14 mb-4 pb-2 text-xl">
					<h2>Latest Transactions</h2>
					<button>
						<IoEllipsisHorizontalSharp className="text-2xl" color="#D8D8D8" />
					</button>
				</div>

				{transactions.isSuccess ? (
					transactions.data?.data.map(transaction => (
						<div key={transaction._id} className="mb-4">
							<div className="font-medium flex items-center justify-between text-black-200">
								<span className="max-w-sm mr-4 truncate">{transaction.narration}</span>
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
					))
				) : (
					<div className="text-center">
						<p>
							It appears you haven't linked an account. Please click the button below to start the
							process.
						</p>
						<Button
							className="bg-black-100 mx-auto mt-4 px-4 py-2 rounded text-white"
							onClick={openMonoWidget}
							loading={linkAccountRequest.isLoading}
							disabled={linkAccountRequest.isLoading}
						>
							LINK ACCOUNT
						</Button>
					</div>
				)}

				{transactions.isSuccess && transactions.data?.data.length > 0 ? (
					<div className="flex items-center justify-center font-extralight mt-8 mb-4 text-sm">
						VIEW ALL <MdOutlineKeyboardArrowRight className="ml-[0.1rem]" />
					</div>
				) : null}
			</section>

			<section className="bg-white-sky px-12 pt-10 order-first mobile:order-1 text-center text-black-200">
				<div className="bg-white rounded-[10px] mb-10 px-6 pt-8 pb-6 shadow-md">
					<p className="mobile:hidden font-normal mb-4 opacity-80 text-xl tracking-wide text-black-200">
						{getGreeting()}, <span className="capitalize">{session?.user.first_name} 👋</span>
					</p>

					<p className="font-medium text-lg">TOTAL BALANCE</p>

					<p className="font-semibold text-5xl mobile:mt-4">
						{totalBalance.data && formatAmount(Number(totalBalance.data) / 100, 0)}
					</p>

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

					<Button
						className="bg-red-100 font-medium mx-auto px-6 py-4 rounded-xl tracking-wider text-red"
						onClick={() => setIsOpen(true)}
						disabled={unlinkAccountRequest.isLoading}
						loading={unlinkAccountRequest.isLoading}
					>
						UNLINK BANK ACCOUNT
					</Button>
					<Prompt
						context="Are you sure you want to unlink your account?"
						affirmFn={() => unlinkAccount(selectedAccount?.account_id)}
						isOpen={isOpen}
						closePrompt={() => setIsOpen(false)}
					/>
				</div>
			</section>
		</section>
	);
}

Home.getLayout = (page: ComponentType) => <Layout>{page}</Layout>;
Home.protected = true;
