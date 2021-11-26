import Redis, { Redis as RedisType } from 'ioredis';
import { env } from './env';
import { logger } from './logger';

let redis: RedisType;

if (env.REDIS_URL) {
	redis = new Redis(env.REDIS_URL, {
		connectTimeout: 5000,
		maxRetriesPerRequest: 3,
		showFriendlyErrorStack: env.NODE_ENV === 'development',
	});
} else {
	redis = new Redis({
		host: env.REDIS_HOST,
		port: Number(env.REDIS_PORT),
		password: env.REDIS_PASSWORD,
		connectTimeout: 5000,
		maxRetriesPerRequest: 3,
		showFriendlyErrorStack: env.NODE_ENV === 'development',
	});
}

redis.on('connect', () => logger.info('Redis connection established!'));
redis.on('reconnecting', () => logger.info('reconnecting'));

redis.on('error', err => {
	if (err.name === 'MaxRetriesPerRequestError') {
		logger.error(`Critical Redis error: ${err.message}. Shutting down.`);
		process.exit(1);
	} else {
		logger.error(`Redis encountered an error: ${err.message}.`);
		process.exit(1);
	}
});

export { redis };
