import { z } from 'zod';

export const UserSchema = z.object({
	id: z.string(),
	first_name: z.string({ required_error: 'firstName is required' }).min(2),
	last_name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
	access_token_secret: z.string(),
	refresh_token_secret: z.string(),
	last_login: z.date().optional(),
	created_at: z.date().optional(),
	updated_at: z.date().optional(),
});

export const UserInputSchema = z.object({
	first_name: z.string({ required_error: 'first_name is required' }).min(2),
	last_name: z.string({ required_error: 'last_name is required' }).min(2),
	email: z.string({ required_error: 'email is required' }).email(),
	password: z
		.string({ required_error: 'password is required' })
		.min(6, { message: 'Password must be at least 6 characters' }),
});

export const LoginInputSchema = z.object({
	email: z.string({ required_error: 'email is required' }).email(),
	password: z
		.string({ required_error: 'password is required' })
		.min(6, { message: 'Password must be at least 6 characters' }),
});

export type User = z.infer<typeof UserSchema>;
export type UserInput = z.infer<typeof UserInputSchema>;
export type LoginInput = z.infer<typeof LoginInputSchema>;
