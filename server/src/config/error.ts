import { AxiosError } from 'axios';
import { NextFunction, Request } from 'express';
import { HttpError } from 'http-errors';
import { ZodError } from 'zod';

import { ApiResponse } from '../types';
import { logger } from './logger';

interface AppError extends HttpError, AxiosError {
	status: number;
}

export function ErrorHandler(err: AppError, _req: Request, res: ApiResponse, _next: NextFunction) {
	let data;
	let message = err.response?.data.message || err.message || 'Internal server error';
	logger.error(message);

	if (err instanceof ZodError) {
		const errorMap: Record<string, string> = {};
		const fieldErrors = err.flatten().fieldErrors;

		Object.keys(fieldErrors).forEach((path: string) => {
			errorMap[path] = fieldErrors[path][0];
		});

		message = 'Payload failed validation';
		data = errorMap;
		err.status = 400;
	}

	return res.status(err.status || 500).json({
		message: message,
		status: err.status || 500,
		data,
	});
}

export function exitErrorHandler(err: Error) {
	logger.fatal(err);
	process.exitCode = 1;
	process.kill(process.pid, 'SIGTERM');
}
