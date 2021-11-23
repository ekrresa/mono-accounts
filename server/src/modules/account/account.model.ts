import { Document, model, Schema } from 'mongoose';
import { Account } from './account.schema';

const accountSchema = new Schema(
	{
		id: { type: String, required: true },
		user_id: { type: String, required: true },
		account_id: { type: String, unique: true },
	},
	{
		id: false,
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

export const AccountModel = model<Account & Document>('Account', accountSchema);
