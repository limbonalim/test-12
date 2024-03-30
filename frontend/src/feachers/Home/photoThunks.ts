import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { IMyError, IPhoto } from '../../types';
import axiosApi from '../../axiosApi';

export const getAll = createAsyncThunk<
	IPhoto[],
	void,
	{ rejectValue: IMyError }
>('photo/getAll', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosApi.get<IPhoto[]>('/photo');
		return response.data;
	} catch (e) {
		if (isAxiosError(e) && e.response && e.response.status === 422) {
			return rejectWithValue(e.response.data);
		}

		throw e;
	}
});
