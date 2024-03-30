import { Box, Typography } from '@mui/material';
import React from 'react';
import { IPhoto } from '../../types';
import { BASE_URL } from '../../constants';

const PhotoItem: React.FC<IPhoto> = ({_id, author, title, image }) => {
	return (
		<Box>
			<Box onClick={() => 'click'}>
				<img src={BASE_URL + image} alt={title} />
				<Typography>{title}</Typography>
			</Box>
			<Typography onClick={() => 'click'}>
				Author: {author.displayName}
			</Typography>
		</Box>
	);
};

export default PhotoItem;
