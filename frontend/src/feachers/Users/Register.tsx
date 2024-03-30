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
	Box,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectIsRegisterLoading, selectRegisterError } from './usersSlice.ts';
import { register } from './usersThunks.ts';
import type { IRegisterForm } from '../../types';

const Register = () => {
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectRegisterError);
	const isLoading = useAppSelector(selectIsRegisterLoading);
	const navigate = useNavigate();

	const [state, setState] = useState<IRegisterForm>({
		email: '',
		password: '',
		displayName: '',
	});

	const getFieldError = (fieldName: string) => {
		try {
			return error?.errors[fieldName].message;
		} catch {
			return undefined;
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await dispatch(register(state)).unwrap();
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
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
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
								error={Boolean(getFieldError('username'))}
								helperText={getFieldError('username')}
								autoComplete="current-email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								sx={{ width: '100%' }}
								required
								name="displayName"
								label="Name"
								value={state.displayName}
								onChange={onChange}
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
								error={Boolean(getFieldError('password'))}
								helperText={getFieldError('password')}
								autoComplete="new-password"
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
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link component={RouterLink} to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
export default Register;
