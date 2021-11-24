import axios from 'axios';
import { env } from '../config/env';

export const axiosInstance = axios.create({
	baseURL: 'https://api.withmono.com',
	headers: {
		Accept: 'application/json',
		'mono-sec-key': env.MONO_SECRET_KEY,
		'Content-Type': 'application/json',
	},
});
