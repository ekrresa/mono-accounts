import pino from 'pino';
import { env } from './env';

// log levels system
const levels = {
	http: 10,
	debug: 20,
	info: 30,
	warn: 40,
	error: 50,
	fatal: 60,
};

export const logger = pino({
	base: { pid: false },
	customLevels: levels,
	useOnlyCustomLevels: true,
	level: 'http',
	prettyPrint: env.NODE_ENV === 'development',
});
