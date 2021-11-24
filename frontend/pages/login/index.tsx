import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import CheckBox from '../../components/CheckBox';
import { axiosInstance } from '../../utils/request';
import LogoDark from '../../public/images/logo-dark.svg';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		try {
			await axiosInstance.post('/auth/login', { email, password });
			router.push('/');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(error.response?.data.message || error.message);
			}
		}
	};

	return (
		<div className="bg-black-100 h-screen flex items-start justify-center">
			<div className="bg-white rounded-[18.152px] flex-1 max-w-xl mt-32 px-8 sm:px-28 py-12 text-center">
				<LogoDark className="mx-auto w-40" />
				<p className="font-light text-[0.938rem] mt-6 opacity-70 text-black-100">
					Securely login to your account
				</p>

				<form className="mt-7 text-black-100" onSubmit={handleSubmit}>
					<input
						className="block border border-gray-200 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="Email"
						type="email"
						onChange={e => setEmail(e.currentTarget.value)}
					/>
					<input
						className="block border border-gray-200 mt-4 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="Password"
						type="password"
						onChange={e => setPassword(e.currentTarget.value)}
					/>

					<div className="flex justify-between my-6">
						<CheckBox label="Remember me" onChange={() => {}} />
						<p className="opacity-70 font-light text-right text-sm">
							<Link href="/forgot_password" passHref>
								<a>I forgot my password</a>
							</Link>
						</p>
					</div>

					<button className="bg-blue font-light py-3 rounded-md text-white text-[1.06rem] w-full filter drop-shadow-first">
						LOG IN
					</button>
				</form>

				<p className="mt-12 text-blue text-center text-sm">
					Don't have an account?
					<Link href="/signup" passHref>
						<a className="ml-2 underline">Sign up</a>
					</Link>
				</p>
			</div>
		</div>
	);
}
