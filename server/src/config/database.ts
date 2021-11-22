import mongoose from 'mongoose';

import { logger } from './logger';
import { env } from './env';

export async function connectToDatabase() {
	const MONGODB_URL = env.DATABASE_URL;

	try {
		await mongoose.connect(MONGODB_URL, { serverSelectionTimeoutMS: 5000 });
		logger.info('Database connection established');
	} catch (error) {
		if (error instanceof Error && error.name === 'MongoError') {
			mongoDBError(error);
		}
	}

	mongoose.connection.on('disconnected', mongoDBDisconnected);
	mongoose.connection.on('error', mongoDBError);
}

export async function disconnectDB() {
	await mongoose.connection.close();

	logger.info('Database connection closed');
}

function mongoDBDisconnected() {
	logger.info('Database disconnected');
}

function mongoDBError(err: mongoose.Error) {
	logger.error('MongoDB Error: ', err);
	throw err;
}
