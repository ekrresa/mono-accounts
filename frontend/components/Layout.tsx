import { PropsWithChildren } from 'react';
import { signOut } from 'next-auth/client';
import { NavLink } from './NavLink';
import { DASHBOARD } from '../constants/routes';
import LogoLight from '../public/images/logo-light.svg';

export function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className="flex">
			<aside className="bg-black-100 sticky top-0 left-0 flex-col flex-shrink-0 h-screen px-16 overflow-y-auto w-72">
				<div className="py-16">
					<LogoLight className="w-32" />
				</div>

				<div>
					{Object.keys(DASHBOARD).map(key => (
						<NavLink key={key} path={DASHBOARD[key]} className="pb-8 last:pb-0" text={key} />
					))}
				</div>

				<button
					className="absolute bg-[#443b3b] bottom-48 rounded-md px-6 py-2 text-xl text-red-200"
					onClick={() => {
						signOut({ redirect: false });
					}}
				>
					Log out
				</button>
			</aside>
			{children}
		</main>
	);
}
