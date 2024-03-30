import { Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout.tsx';
import Home from './feachers/Home/Home.tsx';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import Register from './feachers/Users/Register.tsx';
import Login from './feachers/Users/Login.tsx';

const App = () => {
	return (
		<>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</>
	);
};

export default App;