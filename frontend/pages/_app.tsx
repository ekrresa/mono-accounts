import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import store from '../stores';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<Component {...pageProps} />
				<Toaster />
				<ReactQueryDevtools initialIsOpen={false} />
			</Provider>
		</QueryClientProvider>
	);
}

export default MyApp;
