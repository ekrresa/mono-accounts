import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Provider as NextAuthProvider, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import type { Page } from '../types/app';
import '../styles/globals.css';

type Props = AppProps & {
	Component: Page;
};

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

export default function MyApp({ Component, pageProps }: Props) {
	const renderLayout = Component.getLayout ?? (page => page);

	/**
	 * Prevents unauthorized access
	 */
	const isPageProtected = Boolean(Component.protected);

	return (
		<NextAuthProvider session={pageProps.session}>
			<QueryClientProvider client={queryClient}>
				{isPageProtected ? (
					<Auth>{renderLayout(<Component {...pageProps} />)}</Auth>
				) : (
					renderLayout(<Component {...pageProps} />)
				)}
				<Toaster position="top-center" toastOptions={{ duration: 4000 }} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</NextAuthProvider>
	);
}

function Auth({ children }: { children: any }) {
	const [session, loading] = useSession();
	const router = useRouter();

	const isLoggedIn = Boolean(session?.user.accessToken);

	useEffect(() => {
		if (loading) return;

		if (!isLoggedIn) router.push('/auth/login');
	}, [isLoggedIn, loading, router]);

	if (isLoggedIn) {
		return children;
	}

	/**
	 * Session is being fetched
	 * If user is not logged in, useEffect() will redirect to login page
	 */
	return <div className="h-screen flex items-start justify-center text2xl">Loading...</div>;
}
