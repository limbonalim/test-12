import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAll, getByUser } from './photoThunks';
import {
	selectCurretAuthor,
	selectDeleteError,
	selectError,
	selectIsLoading,
	selectPhoto,
} from './photoSlice';
import PhotoItem from '../../components/PhotoItem/PhotoItem';
import Loader from '../../components/UI/Loader/Loader';
import PhotoDialog from '../../components/PhotoItem/PhotoDialog';
import { selectUser } from '../Users/usersSlice';

const Home = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);
	const author = useAppSelector(selectCurretAuthor);
	const photo = useAppSelector(selectPhoto);
	const isLoading = useAppSelector(selectIsLoading);
	const error = useAppSelector(selectError);
	const deleteError = useAppSelector(selectDeleteError);
	const { id, name } = useParams();
	const componentError = error || deleteError;
	let authorName;
	let render;

	const getContent = async () => {
		if (id) {
			return await dispatch(getByUser(id)).unwrap();
		}
		await dispatch(getAll()).unwrap();
	};

	useEffect(() => {
		void getContent();
	}, [dispatch, id]);

	if (photo) {
		if (id) {
			render = photo.map(({ _id, author, title, image }) => (
				<PhotoItem
					key={_id}
					_id={_id}
					author={author}
					title={title}
					image={image}
				/>
			));
		} else {
			render = photo.map(({ _id, author, title, image }) => (
				<PhotoItem
					key={_id}
					_id={_id}
					author={author}
					title={title}
					image={image}
					showAuthor
				/>
			));
		}
	}

	if (name) {
		authorName = (
			<Box mb={2} display="flex" justifyContent="space-between">
				<Typography variant="h4">{author?.displayName}'s galery</Typography>
				{id === user?._id ? (
					<Button onClick={() => navigate('/new-photo')}>add new photo</Button>
				) : null}
			</Box>
		);
	}

	return (
		<>
			{componentError && (
				<Alert security="error" sx={{ mb: 2 }}>
					{componentError.message}
				</Alert>
			)}
			{isLoading ? (
				<Loader />
			) : (
				<>
					{authorName}
					<Box display="flex" sx={{ gap: 2, flexWrap: 'wrap' }}>
						{render}
					</Box>
				</>
			)}
			<PhotoDialog />
		</>
	);
};

export default Home;
