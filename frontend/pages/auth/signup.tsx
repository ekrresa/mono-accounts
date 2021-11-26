import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { signIn, SignInResponse } from 'next-auth/client';

import { Button } from '../../components/Button';
import LogoDark from '../../public/images/logo-dark.svg';

export default function SignUp() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: { first_name: '', last_name: '', email: '', password: '' },
		onSubmit: async values => {
			const response = (await signIn('register', {
				...values,
				redirect: false,
			})) as unknown as SignInResponse;
			if (response.error) {
				toast.error(response.error);
				return;
			}

			router.push('/final_step');
		},
	});

	return (
		<div className="bg-black-100 h-screen flex items-start justify-center">
			<div className="bg-white rounded-[18.152px] flex-1 max-w-xl mt-32 px-8 sm:px-28 py-12 text-center">
				<LogoDark className="mx-auto w-40" />
				<p className="font-light text-[0.938rem] mt-6 opacity-70 text-black-100">
					Track all your bank expenses in one place
				</p>

				<form className="mt-7 text-black-100" onSubmit={formik.handleSubmit}>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
						<input
							name="first_name"
							className="border border-gray-200 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none"
							placeholder="First Name"
							onChange={formik.handleChange}
						/>
						<input
							name="last_name"
							className="border border-gray-200 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none"
							placeholder="Last Name"
							onChange={formik.handleChange}
						/>
					</div>

					<input
						name="email"
						className="block border border-gray-200 mt-4 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="Email"
						type="email"
						onChange={formik.handleChange}
					/>
					<input
						name="password"
						className="block border border-gray-200 mt-4 font-light placeholder-gray px-5 py-3 rounded-md focus:outline-none w-full"
						placeholder="Password"
						type="password"
						onChange={formik.handleChange}
					/>

					<p className="my-6 opacity-70 font-light text-right text-sm">
						<Link href="/forgot_password" passHref>
							<a>I forgot my password</a>
						</Link>
					</p>

					<Button
						className="bg-blue font-light py-3 rounded-md text-white text-[1.06rem] w-full filter drop-shadow-first"
						loading={formik.isSubmitting}
						disabled={formik.isSubmitting}
						type="submit"
					>
						GET STARTED
					</Button>
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
