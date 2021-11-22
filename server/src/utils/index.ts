import { customAlphabet, nanoid } from 'nanoid/async';

const nanoidBase = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 20);

export async function generateUserId() {
	return await nanoidBase();
}

export async function generateRandomString() {
	return await nanoid();
}
