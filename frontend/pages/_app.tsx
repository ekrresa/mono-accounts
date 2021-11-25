import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import store, { persistor } from '../stores';
import type { Page } from '../types/app';
import '../styles/globals.css';

type Props = AppProps & {
	Component: Page;
};

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

function MyApp({ Component, pageProps }: Props) {
	const renderLayout = Component.getLayout ?? (page => page);

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{renderLayout(<Component {...pageProps} />)}
					<Toaster />
					<ReactQueryDevtools initialIsOpen={false} />
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
