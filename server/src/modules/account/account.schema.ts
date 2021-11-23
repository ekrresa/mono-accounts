import { z } from 'zod';

export const AccountSchema = z.object({
	id: z.string(),
	account_id: z.string(),
	user_id: z.string(),
});

export const AccountInputSchema = z.object({
	account_code: z.string(),
	user_id: z.string(),
});

export type Account = z.infer<typeof AccountSchema>;
export type AccountInput = z.infer<typeof AccountInputSchema>;
