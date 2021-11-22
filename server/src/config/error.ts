import { logger } from './logger';

export function exitErrorHandler(err: Error) {
	logger.fatal(err);
	process.exitCode = 1;
	process.kill(process.pid, 'SIGTERM');
}
