import { ComponentType, useState } from 'react';
import { useMutation } from 'react-query';
import { signOut } from 'next-auth/client';
import { toast } from 'react-hot-toast';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { Prompt } from '../../components/Prompt';
import { apiMutationHandler } from '../../hooks/api/mutation';

export default function Settings() {
	const [isOpen, setIsOpen] = useState(false);
	const deleteAccountRequest = useMutation(() =>
		apiMutationHandler({ url: '/auth/delete/me', method: 'DELETE' })
	);

	const handleDelete = () => {
		deleteAccountRequest.mutate(undefined, {
			onError: (error: any) => {
				toast.error(error?.response?.data.message || error.message);
			},
			onSuccess: async () => {
				toast.success('Account deleted successfully');
				await signOut({ redirect: false });
			},
		});
	};

	return (
		<section className="px-12 pt-12">
			<Button
				className="bg-red-100 font-medium px-6 py-4 rounded-xl tracking-wide text-red shadow"
				onClick={() => setIsOpen(true)}
				disabled={deleteAccountRequest.isLoading}
				loading={deleteAccountRequest.isLoading}
			>
				Delete Account
			</Button>

			<Prompt
				affirmFn={handleDelete}
				context="Are you sure you want to delete your account?"
				isOpen={isOpen}
				closePrompt={() => setIsOpen(false)}
			/>
		</section>
	);
}

Settings.getLayout = (page: ComponentType) => <Layout>{page}</Layout>;
