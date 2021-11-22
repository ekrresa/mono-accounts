import httpGracefulShutdown from 'http-graceful-shutdown';

import app from './app';
import { exitErrorHandler } from './config/error';
import { logger } from './config/logger';
import { env } from './config/env';
import { connectToDatabase, disconnectDB } from './config/database';

process.on('unhandledRejection', (reason: any) => {
	exitErrorHandler(reason);
});

process.on('uncaughtException', err => {
	exitErrorHandler(err);
});

const server = app.listen(env.PORT, async () => {
	logger.info(`server listening on port ${env.PORT}`);
	await connectToDatabase();
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
