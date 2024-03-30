import React, { PropsWithChildren } from 'react';
import { Container } from '@mui/material';
import Toolbar from '../../Toolbar/Toolbar.tsx';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<header>
				<Container sx={{ mb: 2 }}>
					<Toolbar />
				</Container>
			</header>
			<main>
				<Container sx={{ mt: 2 }}>{children}</Container>
			</main>
		</>
	);
};

export default Layout;
