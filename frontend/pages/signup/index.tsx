import Link from 'next/link';
import LogoDark from '../../public/images/logo-dark.svg';

export default function SignUp() {
	return (
		<div className="bg-black-100 h-screen flex items-start justify-center">
			<div className="bg-white rounded-[18.152px] flex-1 max-w-xl mt-32 px-8 sm:px-28 py-12 text-center">
				<LogoDark className="mx-auto w-40" />
				<p className="font-light text-[0.938rem] mt-6 opacity-70 text-black-100">
					Track all your bank expenses in one place
				</p>

				<form className="mt-7 text-black-100">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
						<input
							className="border border-gray-200 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none"
							placeholder="First Name"
						/>
						<input
							className="border border-gray-200 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none"
							placeholder="Last Name"
						/>
					</div>

					<input
						className="block border border-gray-200 mt-4 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="Email"
					/>
					<input
						className="block border border-gray-200 mt-4 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="Password"
					/>

					<p className="my-6 opacity-70 font-light text-right text-sm">
						<Link href="/forgot_password" passHref>
							<a>I forgot my password</a>
						</Link>
					</p>

					<button className="bg-blue font-light py-3 rounded-md text-white text-[1.06rem] w-full filter drop-shadow-first">
						GET STARTED
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
