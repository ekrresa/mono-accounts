import { User } from './user.schema';
import { UserModel } from './user.model';

export async function checkIfUserExists(email: string) {
	return await UserModel.exists({ email });
}

export async function createUser(user: User) {
	return await UserModel.create(user);
}

export async function getUser(userId: string) {
	return await UserModel.findOne({ id: userId });
}

export async function getUserByEmail(email: string) {
	return await UserModel.findOne({ email });
}
