import { Box, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IPhoto } from '../../types';
import { BASE_URL } from '../../constants';
import { useAppDispatch } from '../../app/hooks';
import { getCurrentPhoto, openDialog } from '../../feachers/Home/photoSlice';

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
	const navigate = useNavigate();

	const openDialogPhoto = () => {
		dispatch(getCurrentPhoto(_id));
		dispatch(openDialog());
	};

	const openAuthorPage = () => {
		navigate(`/author/${author?._id}/${author?.displayName}`);
	};

	return (
		<Box>
			<Box onClick={openDialogPhoto}>
				<img src={BASE_URL + image} alt={title} />
				<Typography>{title}</Typography>
			</Box>
			{showAuthor ? (
				<Typography onClick={openAuthorPage}>
					Author: {author.displayName}
				</Typography>
			) : null}
		</Box>
	);
};

export default PhotoItem;
