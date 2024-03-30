import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppDispatch } from '../../app/hooks.ts';
import { logout } from '../../feachers/Users/usersThunks.ts'
import { BASE_URL } from '../../constants.ts';
import type { IUser } from '../../types';


interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let avatar = user.avatar;
  if (user.avatar && user.avatar.slice(0, 6) === 'images/') {
    avatar = `${BASE_URL}/${user.avatar}`;
  }

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
		<>
			<Button color="inherit" onClick={onClick}>
				Hello, {user.displayName}
				{user.avatar ? (
					<Avatar alt={user.displayName} src={avatar} sx={{ mx: 1 }} />
				) : (
					<AccountCircleIcon sx={{ mx: 1 }} />
				)}
			</Button>
			<Menu
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={onClose}
				keepMounted
			>
				<MenuItem onClick={() => dispatch(logout())}>LogOut</MenuItem>
				<MenuItem onClick={() => navigate('/new-photo')}>New Photo</MenuItem>
				<MenuItem
					onClick={() =>
						navigate(`/author/${user._id}/${user.displayName}`)
					}
				>
					My Photo
				</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;