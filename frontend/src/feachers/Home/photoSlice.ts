import { createSlice } from '@reduxjs/toolkit';
import { getAll } from './photoThunks';
import { IMyError, IPhoto } from '../../types';
import { RootState } from '../../app/store';

interface PhotoSlice {
	photo: IPhoto[];
	isLoading: boolean;
	error: IMyError | null;
}

const initialState: PhotoSlice = {
	photo: [],
	isLoading: false,
	error: null,
};

const photoSlice = createSlice({
	name: 'photo',
	initialState,
	reducers: {},
	extraReducers: (bilder) => {
		bilder
			.addCase(getAll.pending, (state) => {
				state.photo = [];
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getAll.fulfilled, (state, { payload: photo }) => {
				state.photo = photo;
				state.isLoading = false;
			})
			.addCase(getAll.rejected, (state, { payload: error }) => {
				state.isLoading = false;
				state.error = error || null;
			});
	},
});

export const selectPhoto = (state: RootState) => state.photo.photo;
export const selectIsLoading = (state: RootState) => state.photo.isLoading;
export const selectError = (state: RootState) => state.photo.error;

export const photoReducer = photoSlice.reducer;
