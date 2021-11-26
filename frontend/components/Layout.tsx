import { PropsWithChildren } from 'react';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { DASHBOARD } from '../constants/routes';
import LogoLight from '../public/images/logo-light.svg';

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className="block sidebar:flex">
			<aside className="bg-black-100 relative sidebar:sticky top-0 left-0 flex flex-col flex-shrink-0 h-auto sidebar:h-screen px-4 py-4 sidebar:py-0 sidebar:px-16 w-full sidebar:w-72">
				<div className="pt-4 pb-8 sidebar:py-16">
					<Link href="/" passHref>
						<a>
							<LogoLight className="w-32 mx-auto sidebar:mx-0" />
						</a>
					</Link>
				</div>

				<div className="flex-1 flex flex-row sidebar:flex-col justify-start sm:justify-center sidebar:justify-start items-center sidebar:items-start space-x-6 sidebar:space-x-0 sidebar:space-y-8 overflow-auto px-4">
					{Object.keys(DASHBOARD).map(key => (
						<NavLink
							key={key}
							path={DASHBOARD[key]}
							className="text-lg sidebar:text-[1.375rem]"
							text={key}
						/>
					))}

					<button
						className="bg-[#443b3b] rounded-md px-3 py-1 my-auto text-lg sidebar:text-xl text-red-200 whitespace-nowrap"
						onClick={() => {
							signOut({ redirect: false });
						}}
					>
						Log out
					</button>
				</div>
			</aside>
			{children}
		</main>
	);
}
