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

export const userIdSchema = AccountSchema.pick({ user_id: true });
export const accountIdSchema = AccountSchema.pick({ account_id: true });

const AccountInfoSchema = z.object({
	_id: z.string().optional(),
	name: z.string(),
	currency: z.string(),
	type: z.string(),
	accountNumber: z.string(),
	balance: z.number(),
	bvn: z.string(),
	institution: z.object({
		name: z.string(),
		bankCode: z.string(),
		type: z.string(),
	}),
});

export type Account = z.infer<typeof AccountSchema>;
export type AccountInput = z.infer<typeof AccountInputSchema>;
export type AccountInfo = z.infer<typeof AccountInfoSchema>;
