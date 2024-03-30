import { Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../feachers/Users/usersSlice.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';

const Toolbar = () => {
	const user = useAppSelector(selectUser);
	return (
		<Grid
			container
			sx={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}
		>
			<Grid item>
				<Link
					to="/"
					component={RouterLink}
					color="inherit"
					sx={{ textDecoration: 'none', fontSize: 25 }}
				>
					Galery
				</Link>
			</Grid>
			{user ? <UserMenu user={user} /> : <AnonymousMenu />}
		</Grid>
	);
};

export default Toolbar;
