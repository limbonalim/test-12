import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../feachers/Users/usersSlice.ts';
import { Roles } from '../../../constants.ts';

interface Props extends PropsWithChildren {
	isAdmin?: boolean;
}

const Protected: React.FC<Props> = ({ children, isAdmin }) => {
	const user = useAppSelector(selectUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
		if (isAdmin && user?.role !== Roles.admin) {
			navigate('/login');
		}
	}, [user]);

	return <>{children}</>;
};

export default Protected;
