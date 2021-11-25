import { redis } from '../config/redis';

export async function addToCache(key: string, item: any) {
	await redis.set(key, JSON.stringify(item));
}

export async function addToCacheWithExpiration(key: string, item: any, exp = 86400) {
	await redis.setex(key, exp, JSON.stringify(item));
}

export async function getFromCache<T>(key: string): Promise<T> {
	return JSON.parse((await redis.get(key)) as string);
}

export async function removeFromCache(key: string) {
	await redis.del(key);
}
