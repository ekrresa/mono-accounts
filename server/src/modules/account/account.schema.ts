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

export const UserIdSchema = AccountSchema.pick({ user_id: true });
export const AccountIdSchema = AccountSchema.pick({ account_id: true });

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

export const TransactionsQuerySchema = z
	.object({
		limit: z.string().optional(),
		type: z.enum(['credit', 'debit']).optional(),
		start: z.string().optional(),
		end: z.string().optional(),
	})
	.refine(val => !((val.start && !val.end) || (!val.start && val.end)), {
		message: 'start and end params go together or not at all',
		path: ['start'],
	});

export type Account = z.infer<typeof AccountSchema>;
export type AccountInput = z.infer<typeof AccountInputSchema>;
export type AccountInfo = z.infer<typeof AccountInfoSchema>;
export type TransactionsQuery = z.infer<typeof TransactionsQuerySchema>;
