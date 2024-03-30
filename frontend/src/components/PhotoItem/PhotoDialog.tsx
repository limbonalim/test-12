import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import { BASE_URL, Roles } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	closeDialog,
	selectCurrentPhoto,
	selectIsDeleteLoading,
	selectIsOpenDialog,
} from '../../feachers/Home/photoSlice';
import { selectUser } from '../../feachers/Users/usersSlice';
import {
	deletePhoto,
	getAll,
	getByUser,
} from '../../feachers/Home/photoThunks';

const PhotoDialog = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector(selectIsOpenDialog);
	const photo = useAppSelector(selectCurrentPhoto);
	const user = useAppSelector(selectUser);
	const { pathname } = useLocation();
	const isDeleteLoading = useAppSelector(selectIsDeleteLoading);
	let deleteButton;

	const handleClose = () => {
		dispatch(closeDialog());
	};

	const handleDelete = async () => {
		handleClose();
		await dispatch(deletePhoto(photo?._id || '')).unwrap();
		if (pathname === '/') {
			await dispatch(getAll()).unwrap();
		} else {
			const path = pathname.split('/');
			await dispatch(getByUser(path[2])).unwrap();
		}
	};

	if (user?.role === Roles.admin || photo?.author._id === user?._id) {
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
		<>
			<Dialog
				open={open}
				fullScreen
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<AppBar
					sx={{
						position: 'relative',
						background:
							'linear-gradient(90deg, rgba(16,164,96,0.321187850140056) 0%, rgba(19,133,164,0.3968181022408963) 35%, rgba(0,212,255,0.41642594537815125) 100%)',
						color: 'inherit',
					}}
				>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							{photo?.title}
						</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: 'rgba(40, 162, 227, 0.11390493697478987)',
					}}
				>
					<DialogContentText id="alert-dialog-description">
						<img src={BASE_URL + photo?.image} alt={photo?.title} />
					</DialogContentText>
				</DialogContent>
				<DialogActions>{deleteButton}</DialogActions>
			</Dialog>
		</>
	);
};

export default PhotoDialog;
