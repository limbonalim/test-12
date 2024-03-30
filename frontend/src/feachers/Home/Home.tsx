import { useEffect } from 'react';
import { Alert, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAll } from './photoThunks';
import { selectError, selectIsLoading, selectPhoto } from './photoSlice';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import Loader from '../../components/UI/Loader/Loader';

const Home = () => {
	const dispatch = useAppDispatch();
	const photo = useAppSelector(selectPhoto);
	const isLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectError);
	let render;
	useEffect(() => {
		dispatch(getAll());
	}, []);
	
	if (photo) {
		render = photo.map(({ _id, author, title, image }) => (
			<PhotoItem
				key={_id}
				_id={_id}
				author={author}
				title={title}
				image={image}
			/>
		));
	}

	return (
		<>
			{error && (
				<Alert security="error" sx={{ mb: 2 }}>
					{error.message}
				</Alert>
			)}
			{isLoading ? (
				<Loader />
			) : (
				<Box display="flex" sx={{ gap: 2, flexWrap: 'wrap' }}>
					{render}
				</Box>
			)}
		</>
	);
};

export default Home;
