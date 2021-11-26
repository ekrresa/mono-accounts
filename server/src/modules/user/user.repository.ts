import { User } from './user.schema';
import { UserModel } from './user.model';

export async function checkIfUserExists(email: string) {
	return await UserModel.exists({ email });
}

export async function createUser(user: User) {
	return await UserModel.create(user);
}

export async function getUser(userId: string) {
	return await UserModel.findOne({ id: userId }).lean();
}

export async function getUserByEmail(email: string) {
	return await UserModel.findOne({ email }).lean();
}

export async function updateUser(userId: string, payload: Partial<User>) {
	return await UserModel.findOneAndUpdate({ id: userId }, payload, { new: true }).lean();
}

export async function deleteUser(userId: string) {
	await UserModel.deleteOne({ id: userId });
}
