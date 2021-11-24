import { configureStore } from '@reduxjs/toolkit';

import AuthReducer from './auth';

const store = configureStore({
	reducer: { auth: AuthReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
