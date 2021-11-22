import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { logger } from './logger';

export function ErrorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction) {
	logger.error(err.message);

	return res
		.status(err.status || 500)
		.json({ message: err.message, status: 'error', statusCode: err.status || 500 });
}

export function exitErrorHandler(err: Error) {
	logger.fatal(err);
	process.exitCode = 1;
	process.kill(process.pid, 'SIGTERM');
}
