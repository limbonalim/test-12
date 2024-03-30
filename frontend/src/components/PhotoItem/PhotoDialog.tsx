import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { BASE_URL, Roles } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
	closeDialog,
	openDialog,
	selectCurrentPhoto,
	selectIsOpenDialog,
} from '../../feachers/Home/photoSlice';
import { selectUser } from '../../feachers/Users/usersSlice';
import { deletePhoto, getAll } from '../../feachers/Home/photoThunks';

const PhotoDialog = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector(selectIsOpenDialog);
	const photo = useAppSelector(selectCurrentPhoto);
	const user = useAppSelector(selectUser);
	let deleteButton;

	const handleClickOpen = () => {
		dispatch(openDialog());
	};

	const handleClose = () => {
		dispatch(closeDialog());
	};

	const handleDelete = async () => {
		handleClose();
		await dispatch(deletePhoto(photo?._id || '')).unwrap();
		dispatch(getAll());
	};

	if (user?.role === Roles.admin || photo?.author._id === user?._id) {
		deleteButton = (
			<Button onClick={handleDelete} variant="outlined" color="error">
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
				<AppBar sx={{ position: 'relative' }}>
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
				<DialogTitle id="alert-dialog-title">
					{photo?.author.displayName}
				</DialogTitle>
				<DialogContent>
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
