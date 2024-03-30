import React, { PropsWithChildren } from 'react';
import { Container } from '@mui/material';
import Toolbar from '../../Toolbar/Toolbar.tsx';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<header
				style={{
					background:
						'linear-gradient(90deg, rgba(16,164,96,0.321187850140056) 0%, rgba(19,133,164,0.3968181022408963) 35%, rgba(0,212,255,0.41642594537815125) 100%)',
				}}
			>
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
