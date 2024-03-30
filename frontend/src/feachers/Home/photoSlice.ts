import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { deletePhoto, getAll } from './photoThunks';
import { IMyError, IPhoto } from '../../types';
import { RootState } from '../../app/store';

interface PhotoSlice {
	photo: IPhoto[];
	isLoading: boolean;
	error: IMyError | null;
  isOpenDialog: boolean;
  currentPhoto: IPhoto | null;
  isDeleteLoading: boolean;
  deleteError: IMyError | null;
}

const initialState: PhotoSlice = {
	photo: [],
	isLoading: false,
	error: null,
  isOpenDialog: false,
  currentPhoto: null,
  isDeleteLoading: false,
  deleteError: null,
};

const photoSlice = createSlice({
	name: 'photo',
	initialState,
	reducers: {
		openDialog: (state) => {
			state.isOpenDialog = true;
		},
		closeDialog: (state) => {
			state.isOpenDialog = false;
      state.currentPhoto = null;
		},
    getCurrentPhoto: (state, {payload: id}: PayloadAction<string>) => {
      const index = state.photo.findIndex((item) => item._id === id);
      if (index >= 0) {
        state.currentPhoto = state.photo[index];
      }
    }
	},
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

      bilder
				.addCase(deletePhoto.pending, (state) => {
					state.isDeleteLoading = true;
					state.error = null;
				})
				.addCase(deletePhoto.rejected, (state, { payload: error }) => {
					state.isDeleteLoading = false;
					state.deleteError = error || null;
				});
	},
});

export const selectPhoto = (state: RootState) => state.photo.photo;
export const selectIsLoading = (state: RootState) => state.photo.isLoading;
export const selectError = (state: RootState) => state.photo.error;
export const selectIsOpenDialog = (state: RootState) => state.photo.isOpenDialog;
export const selectCurrentPhoto = (state: RootState) => state.photo.currentPhoto;

export const selectIsDeleteLoading = (state: RootState) => state.photo.isDeleteLoading;
export const selectDeleteError = (state: RootState) => state.photo.deleteError;

export const { openDialog, closeDialog, getCurrentPhoto } = photoSlice.actions;

export const photoReducer = photoSlice.reducer;
