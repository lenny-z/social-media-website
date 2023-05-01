import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

import App, { loader as appLoader } from './App.js';
import Error from './Error.js';
import Login from './Login.js';
import Register from './Register.js';
import Home, { loader as homeLoader } from './Home.js';
import Search from './Search.js';
import Profile, { loader as profileLoader } from './Profile.js';
import Settings from './Settings.js';

function Index() {
	// Default to unauthorized behavior
	const [isAuthorized, setAuthorized] = React.useState(false);
	const [username, setUsername] = React.useState(null);

	async function getAuthorized() {
		try {
			const res = await axios.get(
				process.env.REACT_APP_AUTHORIZE,
				{ withCredentials: true }
			);

			if (res.status === 200) {
				setAuthorized(true);
				setUsername(res.data);
			}
		} catch (err) {
			console.error(err);
		}
	}

	React.useEffect(() => {
		getAuthorized();
	}, []);

	const router = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			loader: appLoader,
			errorElement: <Error />,
			children: [
				{
					path: '/login',
					element: <Login />
				},
				{
					path: '/register',
					element: <Register />
				},
				{
					path: '/',
					element: <Home />,
					loader: homeLoader(isAuthorized)
				},
				{
					path: '/search',
					element: <Search />,
				},
				{
					path: '/:username',
					element: <Profile />,
					loader: profileLoader
				},
				{
					path: '/settings',
					element: <Settings />
				}
			]
		}
	]);

	return (
		<RouterProvider router={router} />
	);
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		{/* <RouterProvider router={router} /> */}
		<Index />
	</React.StrictMode>
);