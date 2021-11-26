import { axiosClient } from '../../utils/request';

interface MutationOptions {
	body?: any;
	method: 'POST' | 'PUT' | 'DELETE';
	url: string;
}

export async function apiMutationHandler({ url, body, method }: MutationOptions) {
	return await axiosClient({ method, url, data: body });
}
