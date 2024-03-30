import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import FileInput from '../../../components/UI/FileInput/FileInput';
import Protected from '../../../components/UI/Protected/Protected';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCreateError, selectIsCreateLoading } from '../photoSlice';
import { createPhoto, getAll } from '../photoThunks';
import { useNavigate } from 'react-router-dom';

export interface IFormPhoto {
	title: string;
	image: File | null;
}

const PhotoForm = () => {
	const [state, setState] = useState<IFormPhoto>({ title: '', image: null });
	const dispatch = useAppDispatch();
  const navigate = useNavigate();
	const isLoading = useAppSelector(selectIsCreateLoading);
	const error = useAppSelector(selectCreateError);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setState((prev) => ({ ...prev, [name]: value }));
	};

	const getFieldError = (fieldName: string) => {
		try {
			return error?.errors[fieldName].message;
		} catch {
			return undefined;
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({
			...prev,
			image: e.target.files ? e.target.files[0] : null,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await dispatch(createPhoto(state)).unwrap();
    await dispatch(getAll());
    navigate('/');
	};

	return (
		<Protected>
			{getFieldError('image') && (
				<Alert security="error" sx={{ mb: 2 }}>
					{getFieldError('image')}
				</Alert>
			)}
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<Typography>Add Photo</Typography>
				<TextField
					name="title"
					label="Title"
					value={state.title}
					onChange={handleChange}
					required
				/>
				<FileInput onChange={handleImageChange} label="Image" name="image" />
				<Button type="submit" disabled={isLoading}>
					Save
				</Button>
			</Box>
		</Protected>
	);
};

export default PhotoForm;
