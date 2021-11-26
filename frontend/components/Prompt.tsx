import { Modal } from './Modal';

interface PromptProps {
	affirmFn: (props: any) => void;
	context: string;
	isOpen: boolean;
	closePrompt: () => void;
}

export function Prompt({ affirmFn, closePrompt, context, isOpen }: PromptProps) {
	return (
		<Modal isOpen={isOpen} closeModal={closePrompt}>
			<h2 className="font-medium text-2xl mb-2">Confirm</h2>
			<p className="mb-6">{context}</p>

			<div className="flex justify-end">
				<button
					className="bg-red-700 mr-4 rounded flex-1 max-w-[4rem] px-3 py-1 justify-center text-white"
					onClick={closePrompt}
				>
					No
				</button>
				<button
					className="bg-green-700 flex-1 max-w-[4rem] rounded px-3 py-1 justify-center text-white"
					onClick={affirmFn}
				>
					Yes
				</button>
			</div>
		</Modal>
	);
}
