import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import { persistor, store } from './app/store.ts';
import theme from './theme.ts';
import { addInterceptors } from './axiosApi.ts';
import { GOOGLE_CLIENT_ID } from './constants.ts';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<BrowserRouter>
						<ThemeProvider theme={theme}>
							<App />
						</ThemeProvider>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</GoogleOAuthProvider>
	</React.StrictMode>,
);
