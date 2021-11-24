import * as z from 'zod';
import dotenv from 'dotenv';

const envSchema = z.object({
	DATABASE_URL: z.string(),
	MONO_SECRET_KEY: z.string(),
	NODE_ENV: z.string(),
	PORT: z.string(),
});

function loadEnvConfig() {
	dotenv.config();
	return envSchema.passthrough().parse(process.env);
}

export const env = loadEnvConfig();
