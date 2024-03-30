import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
	Avatar,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
	Alert,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Box from '@mui/material/Box';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectIsLoginLoading, selectLoginError } from './usersSlice.ts';
import { googleLogin, login } from './usersThunks.ts';
import type { ILoginForm } from '../../types';

const Login = () => {
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectLoginError);
	const isLoading = useAppSelector(selectIsLoginLoading);
	const navigate = useNavigate();

	const [state, setState] = useState<ILoginForm>({
		email: '',
		password: '',
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const googleLoginHandler = async (credential: string) => {
		await dispatch(googleLogin(credential)).unwrap();
		navigate('/');
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await dispatch(login(state)).unwrap();
		navigate('/');
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOpenIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{error && (
					<Alert severity="error" sx={{ mt: 3, width: '100%' }}>
						{error.message}
					</Alert>
				)}
				<Box sx={{ py: 2 }}>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							if (credentialResponse.credential) {
								void googleLoginHandler(credentialResponse.credential);
							}
						}}
						onError={() => {
							console.log('error');
						}}
					/>
				</Box>
				<Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								sx={{ width: '100%' }}
								required
								label="Email"
								name="email"
								type="email"
								value={state.email}
								onChange={onChange}
								autoComplete="current-username"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={{ width: '100%' }}
								required
								name="password"
								label="Password"
								type="password"
								value={state.password}
								onChange={onChange}
								autoComplete="current-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={isLoading}
					>
						Sign In
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link component={RouterLink} to="/register" variant="body2">
								Or sign up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
