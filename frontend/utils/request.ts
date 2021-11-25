import axios from 'axios';
import store from '../stores';
import { authSliceActions } from '../stores/auth';
import jwt, { JwtPayload } from 'jsonwebtoken';

const source = axios.CancelToken.source();
const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	cancelToken: source.token,
});

interface JwtAuthPayload extends JwtPayload {
	user_id: string;
	first_name: string;
}

axiosInstance.interceptors.response.use(response => {
	if (response.headers['x-access-token']) {
		const tokenPayload = jwt.decode(response.headers['x-access-token']) as JwtAuthPayload;

		store.dispatch(
			authSliceActions.updateAuth({
				accessToken: response.headers['x-access-token'],
				refreshToken: response.headers['x-refresh-token'],
				first_name: tokenPayload.first_name,
				user_id: tokenPayload.user_id,
			})
		);
	}

	return response;
});

axiosInstance.interceptors.request.use(request => {
	const authState = store.getState().auth;
	if (request.headers) {
		request.headers.authorization = `Bearer ${authState.accessToken}`;
		request.headers['x-refresh-token'] = authState.refreshToken;
	}

	return request;
});

export { axiosInstance };
