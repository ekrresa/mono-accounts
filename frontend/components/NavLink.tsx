import { useRouter } from 'next/router';
import Link from 'next/link';

interface NavLinkProps {
	className: string;
	path: string;
	text: string;
}

export function NavLink({ className, path, text }: NavLinkProps) {
	const { pathname } = useRouter();
	const isActive = pathname === path;

	return (
		<Link href={path} passHref>
			<a
				className={`block hover:opacity-100 cursor-pointer opacity-50 text-white ${className} ${
					isActive && 'opacity-100'
				}`}
			>
				{text}
			</a>
		</Link>
	);
}
