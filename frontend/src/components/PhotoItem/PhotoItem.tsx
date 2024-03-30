import { Box, Typography } from '@mui/material';
import React from 'react';
import { IPhoto } from '../../types';
import { BASE_URL } from '../../constants';
import { useAppDispatch } from '../../app/hooks';
import { getCurrentPhoto, openDialog } from '../../feachers/Home/photoSlice';

const PhotoItem: React.FC<IPhoto> = ({_id, author, title, image }) => {
	const dispatch = useAppDispatch();

	const openDialogPhoto = () => {
		dispatch(getCurrentPhoto(_id));
		dispatch(openDialog());
	};

	const openAuthorPage = () => {

	}

	return (
		<Box>
			<Box onClick={openDialogPhoto}>
				<img src={BASE_URL + image} alt={title} />
				<Typography>{title}</Typography>
			</Box>
			<Typography onClick={openAuthorPage}>
				Author: {author.displayName}
			</Typography>
		</Box>
	);
};

export default PhotoItem;
