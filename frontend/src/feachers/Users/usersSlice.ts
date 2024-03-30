import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { googleLogin, login, register } from './usersThunks.ts';
import type { IMyError, IUser, ValidationError } from '../../types';

interface IUsersState {
	user: IUser | null;
	isRegisterLoading: boolean;
	registerError: ValidationError | null;
	isLoginLoading: boolean;
	loginError: IMyError | null;
}

const initialState: IUsersState = {
	user: null,
	isRegisterLoading: false,
	registerError: null,
	isLoginLoading: false,
	loginError: null,
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		clearUser: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isRegisterLoading = true;
				state.registerError = null;
			})
			.addCase(register.fulfilled, (state, { payload: user }) => {
				state.isRegisterLoading = false;
				state.user = user;
			})
			.addCase(register.rejected, (state, { payload: error }) => {
				state.isRegisterLoading = false;
				state.registerError = error || null;
			});

		builder
			.addCase(login.pending, (state) => {
				state.isLoginLoading = true;
				state.loginError = null;
			})
			.addCase(login.fulfilled, (state, { payload: user }) => {
				state.isLoginLoading = false;
				state.user = user;
			})
			.addCase(login.rejected, (state, { payload: error }) => {
				state.isLoginLoading = false;
				state.loginError = error || null;
			});

		builder
			.addCase(googleLogin.pending, (state) => {
				state.isLoginLoading = true;
			})
			.addCase(googleLogin.fulfilled, (state, { payload: user }) => {
				state.isLoginLoading = false;
				state.user = user;
			})
			.addCase(googleLogin.rejected, (state, { payload: error }) => {
				state.isLoginLoading = false;
				state.loginError = error || null;
			});
	},
});

export const usersReducers = usersSlice.reducer;

export const selectUser = (state: RootState) => state.users.user;
export const selectIsRegisterLoading = (state: RootState) =>
	state.users.isRegisterLoading;
export const selectRegisterError = (state: RootState) =>
	state.users.registerError;
export const selectIsLoginLoading = (state: RootState) =>
	state.users.isLoginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;

export const { clearUser } = usersSlice.actions;
