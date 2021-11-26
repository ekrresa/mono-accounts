import httpGracefulShutdown from 'http-graceful-shutdown';

import app from './app';
import { connectToDatabase, disconnectDB } from './config/database';
import { exitErrorHandler } from './config/error';
import { env } from './config/env';
import { redis } from './config/redis';
import { logger } from './config/logger';

process.on('unhandledRejection', (reason: any) => {
	throw reason;
});

process.on('uncaughtException', err => {
	exitErrorHandler(err);
});

const server = app.listen(env.PORT, async () => {
	logger.info(`server listening on port ${env.PORT}`);
	await connectToDatabase();
	logger.info(redis.status);
});

httpGracefulShutdown(server, {
	development: true,
	finally: () => {
		logger.info('Server shutdown complete');
	},
	onShutdown: () => {
		return new Promise(resolve => {
			disconnectDB();
			setTimeout(function () {
				logger.info('Server cleanup finished');
				resolve();
			}, 1000);
		});
	},
});

export default server;
