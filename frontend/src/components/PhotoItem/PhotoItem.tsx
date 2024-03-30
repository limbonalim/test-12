import { Box, Button, Link, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, Roles } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	getCurrentAuthor,
	getCurrentPhoto,
	openDialog,
	selectIsDeleteLoading,
} from '../../feachers/Home/photoSlice';
import { selectUser } from '../../feachers/Users/usersSlice';
import {
	deletePhoto,
	getAll,
	getByUser,
} from '../../feachers/Home/photoThunks';
import type { IPhoto } from '../../types';
import './PhotoItem.css'

interface Props extends IPhoto {
	showAuthor?: boolean;
}

const PhotoItem: React.FC<Props> = ({
	_id,
	author,
	title,
	image,
	showAuthor,
}) => {
	const dispatch = useAppDispatch();
	const isDeleteLoading = useAppSelector(selectIsDeleteLoading);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const user = useAppSelector(selectUser);
	let deleteButton;

	const openDialogPhoto = () => {
		dispatch(getCurrentPhoto(_id));
		dispatch(openDialog());
	};

	const handleDelete = async () => {
		await dispatch(deletePhoto(_id || '')).unwrap();
		if (pathname === '/') {
			await dispatch(getAll()).unwrap();
		} else {
			const path = pathname.split('/');
			await dispatch(getByUser(path[2])).unwrap();
		}
	};

	const openAuthorPage = () => {
		dispatch(getCurrentAuthor(author));
		navigate(`/author/${author?._id}/${author?.displayName}`);
	};

	if (user && (user._id === author._id || user.role === Roles.admin)) {
		deleteButton = (
			<Button
				onClick={handleDelete}
				variant="outlined"
				color="error"
				disabled={isDeleteLoading}
			>
				Delete
			</Button>
		);
	}

	return (
		<Box sx={{ maxWidth: '300px' }}>
			<Box onClick={openDialogPhoto}>
				<img
					src={BASE_URL + image}
					alt={title}
					className='PhotoItem-image'
				/>
				<Typography>{title}</Typography>
			</Box>
			{showAuthor ? (
				<Link
					onClick={openAuthorPage}
					underline="hover"
					sx={{ cursor: 'pointer' }}
				>
					Author: {author.displayName}
				</Link>
			) : null}
			{deleteButton}
		</Box>
	);
};

export default PhotoItem;
