import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	accessToken: string;
	refreshToken: string;
	user_id: string;
	first_name: string;
}

const initialState = {
	accessToken: '',
	refreshToken: '',
	user_id: '',
	first_name: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		updateAuth: (state, action: PayloadAction<AuthState>) => {
			return action.payload;
		},
		resetAuth: () => {
			return initialState;
		},
	},
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
