import axios, { AxiosError } from 'axios';
import { getSession, signOut } from 'next-auth/client';

const source = axios.CancelToken.source();
const axiosServer = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	cancelToken: source.token,
});

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	cancelToken: source.token,
});

axiosClient.interceptors.response.use(
	response => {
		return response;
	},
	async (error: AxiosError) => {
		if (error.response?.status === 401 || error.response?.status === 403) {
			return await signOut({ redirect: false });
		}

		return Promise.reject(error);
	}
);

axiosClient.interceptors.request.use(async request => {
	const session = await getSession();

	if (request.headers && session?.user.accessToken) {
		request.headers.authorization = `Bearer ${session?.user.accessToken}`;
		request.headers['x-refresh-token'] = session?.user.refreshToken;
	}

	return request;
});

export { axiosClient, axiosServer };
