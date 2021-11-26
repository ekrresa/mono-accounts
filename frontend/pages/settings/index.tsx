import { ComponentType, useState } from 'react';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';

export default function Settings() {
	const [isOpen, setIsOpen] = useState(false);

	const handleDelete = () => {};

	return (
		<section className="px-12 pt-12">
			<button
				className="bg-red-100 font-medium px-6 py-4 rounded-xl tracking-wide text-red shadow"
				onClick={() => setIsOpen(true)}
			>
				Delete Account
			</button>

			<Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
				<h2 className="font-medium text-2xl mb-2">Confirm</h2>
				<p className="mb-6">Are you sure you want to delete your account?</p>

				<div className="flex justify-end">
					<button
						className="bg-red-700 mr-4 rounded flex-1 max-w-[4rem] px-3 py-1 justify-center text-white"
						onClick={() => setIsOpen(false)}
					>
						No
					</button>
					<button
						className="bg-green-700 flex-1 max-w-[4rem] rounded px-3 py-1 justify-center text-white"
						onClick={handleDelete}
					>
						Yes
					</button>
				</div>
			</Modal>
		</section>
	);
}

Settings.getLayout = (page: ComponentType) => <Layout>{page}</Layout>;
