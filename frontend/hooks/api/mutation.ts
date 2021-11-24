import { axiosInstance } from '../../utils/request';

interface MutationOptions {
	body?: any;
	method: 'POST' | 'PUT' | 'DELETE';
	url: string;
}

export async function apiMutationHandler({ url, body, method }: MutationOptions) {
	return await axiosInstance({ method, url, data: body });
}
