import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { IMyError, IPhoto, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { IFormPhoto } from './PhotoForm/PhotoForm';

export const getAll = createAsyncThunk<
	IPhoto[],
	void,
	{ rejectValue: IMyError }
>('photo/getAll', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosApi.get<IPhoto[]>('/photo');
		return response.data;
	} catch (e) {
		if (isAxiosError(e) && e.response && e.response.status === 404) {
			return rejectWithValue(e.response.data);
		}

		throw e;
	}
});

export const deletePhoto = createAsyncThunk<void, string, { rejectValue: IMyError }>(
	'photo/deletePhoto',
	async (id, { rejectWithValue }) => {
		try {
			await axiosApi.delete(`/photo/${id}`);
		} catch (e) {
			if (isAxiosError(e) && e.response && (e.response.status === 400 || e.response.status === 404)) {
				return rejectWithValue(e.response.data);
			}

			throw e;
		}
	},
);

export const createPhoto = createAsyncThunk<void, IFormPhoto, { rejectValue: ValidationError }>(
	'photo/createPhoto',
	async (data, { rejectWithValue }) => {
		try {
      const formData = new FormData();
      formData.append('title', data.title);
      
      if (data.image) formData.append('image', data.image);
			await axiosApi.post(`/photo`, formData);
		} catch (e) {
			if (
				isAxiosError(e) &&
				e.response &&
				e.response.status === 422
			) {
				return rejectWithValue(e.response.data);
			}

			throw e;
		}
	},
);
