import { useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { AiOutlineLoading } from 'react-icons/ai';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { toast } from 'react-hot-toast';

import { useMonoWidget } from '../../hooks/useMonoWidget';
import { apiMutationHandler } from '../../hooks/api/mutation';
import Lock from '../../public/images/lock.svg';

export default function FinalStep() {
	const router = useRouter();
	const [session] = useSession();
	const { authCode, openMonoWidget, setAuthCode } = useMonoWidget();
	const linkAccountRequest = useMutation((payload: any) =>
		apiMutationHandler({ url: '/accounts/link', body: payload, method: 'POST' })
	);

	const linkAccount = useCallback((code: string, userId: string) => {
		linkAccountRequest.mutate(
			{ account_code: code, user_id: userId },
			{
				onError: (err: any) => {
					setAuthCode('');
					toast.error(err?.response?.data.message || err.message);
				},
				onSuccess: () => {
					setAuthCode('');
					toast.success('Your account has been linked!');
					router.replace('/');
				},
			}
		);
	}, []);

	useEffect(() => {
		if (authCode && session?.user.user_id) {
			linkAccount(authCode, session.user.user_id);
		}
	}, [authCode, linkAccount, session?.user.user_id]);

	return (
		<div className="bg-white h-screen flex items-start justify-center">
			<div className="bg-black-100 rounded-[10px] flex-1 max-w-[25rem] mt-32 px-5 py-12 text-white">
				<Lock className="mx-auto w-12" />
				<h3 className="font-extralight mt-4 text-4xl text-center">Final Step</h3>
				<p className="font-light mt-4 text-center">Link your Bank Account in seconds</p>

				<button
					className="bg-white flex items-center font-medium mx-auto mt-12 px-8 py-3 rounded-md text-blue text-xl"
					onClick={openMonoWidget}
				>
					LINK NOW
					{linkAccountRequest.isLoading ? (
						<AiOutlineLoading className=" ml-2 animate-spin text-xl" />
					) : (
						<RiArrowRightUpLine className="ml-2 text-xl" />
					)}
				</button>
			</div>
		</div>
	);
}
