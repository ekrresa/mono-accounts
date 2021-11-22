import { Document, model, Schema } from 'mongoose';
import { User } from './user.schema';

const userSchema = new Schema(
	{
		id: { type: String, required: true },
		first_name: { type: String },
		last_name: { type: String },
		email: { type: String, unique: true },
		password: { type: String },
		access_token_secret: { type: String },
		refresh_token_secret: { type: String },
		last_login: { type: Date, default: null },
	},
	{ id: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const UserModel = model<User & Document>('User', userSchema);
