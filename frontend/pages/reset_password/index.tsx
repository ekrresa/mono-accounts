import Link from 'next/link';
import LogoDark from '../../public/images/logo-dark.svg';

export default function ResetPassword() {
	return (
		<div className="bg-black-100 h-screen flex items-start justify-center">
			<div className="bg-white rounded-[18.152px] flex-1 max-w-xl mt-32 px-8 sm:px-28 py-12 text-center">
				<LogoDark className="mx-auto w-40" />
				<p className="font-light text-[0.938rem] mt-6 opacity-70 text-black-100">
					Reset your password
				</p>

				<form className="mt-7 text-black-100">
					<input
						className="block border border-gray-200 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="New Password"
					/>
					<input
						className="block border border-gray-200 font-light placeholder-gray mt-4 px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="Confirm New Password"
					/>

					<button className="bg-blue font-light py-3 rounded-md text-white text-[1.06rem] mt-6 w-full filter drop-shadow-first">
						RESET PASSWORD
					</button>
				</form>

				<p className="mt-12 text-blue text-center text-sm">
					Already have an account?
					<Link href="/login" passHref>
						<a className="ml-2 underline">Sign in</a>
					</Link>
				</p>
			</div>
		</div>
	);
}
