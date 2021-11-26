import { ReactNode } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

interface ButtonProps {
	className: string;
	children: ReactNode;
	disabled?: boolean;
	loading?: boolean;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset' | undefined;
}

export function Button({
	className,
	children,
	disabled = false,
	loading = false,
	onClick,
	type = 'button',
}: ButtonProps) {
	return (
		<button
			className={`flex justify-center items-center ${className} disabled:opacity-60 disabled:cursor-not-allowed`}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{children}
			{loading && <AiOutlineLoading className=" ml-4 animate-spin text-xl text-white" />}
		</button>
	);
}
