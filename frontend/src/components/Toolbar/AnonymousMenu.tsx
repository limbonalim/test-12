import { Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AnonymousMenu = () => {
	return (
		<Grid item>
			<Button to="/login" component={RouterLink} color="inherit">
				Sign in
			</Button>
			<Button to="/register" component={RouterLink} color="inherit">
				Sign up
			</Button>
		</Grid>
	);
};

export default AnonymousMenu;
