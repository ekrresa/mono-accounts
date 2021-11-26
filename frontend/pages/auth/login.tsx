import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, SignInResponse } from 'next-auth/client';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

import { Button } from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import LogoDark from '../../public/images/logo-dark.svg';

export default function Login() {
	const router = useRouter();
	const formik = useFormik({
		initialValues: { email: '', password: '' },
		onSubmit: async values => {
			const response = (await signIn('login', {
				...values,
				redirect: false,
			})) as unknown as SignInResponse;

			if (response.error) {
				toast.error(response.error);
				return;
			}

			router.push('/');
		},
	});

	return (
		<div className="bg-black-100 h-screen flex items-start justify-center">
			<div className="bg-white rounded-[18.152px] flex-1 max-w-xl mt-32 px-8 sm:px-28 py-12 text-center">
				<LogoDark className="mx-auto w-40" />
				<p className="font-light text-[0.938rem] mt-6 opacity-70 text-black-100">
					Securely login to your account
				</p>

				<form className="mt-7 text-black-100" onSubmit={formik.handleSubmit}>
					<input
						className="block border border-gray-200 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="Email"
						name="email"
						type="email"
						onChange={formik.handleChange}
					/>
					<input
						className="block border border-gray-200 mt-4 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="Password"
						name="password"
						type="password"
						onChange={formik.handleChange}
					/>

					<div className="flex justify-between my-6">
						<CheckBox label="Remember me" onChange={() => {}} />
						<p className="opacity-70 font-light text-right text-sm">
							<Link href="/forgot_password" passHref>
								<a>I forgot my password</a>
							</Link>
						</p>
					</div>

					<Button
						className="bg-blue font-light py-3 rounded-md text-white text-[1.06rem] w-full filter drop-shadow-first"
						loading={formik.isSubmitting}
						disabled={formik.isSubmitting}
						type="submit"
					>
						LOG IN
					</Button>
				</form>

				<p className="mt-12 text-blue text-center text-sm">
					Don't have an account?
					<Link href="/auth/signup" passHref>
						<a className="ml-2 underline">Sign up</a>
					</Link>
				</p>
			</div>
		</div>
	);
}
