import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

import App from './App.js';
import Error from './Error.js';
import Login from './Login.js';

import Register from './Register.js';
import RegisterEmail from './RegisterEmail.js';
import RegisterUsername from './RegisterUsername.js';
import RegisterPassword from './RegisterPassword.js';

import Home, { loader as homeLoader } from './Home.js';
import Search from './Search.js';
import Profile, { loader as profileLoader } from './Profile.js';
import Settings from './Settings.js';

function Index() {
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
			element: <App isAuthorized={isAuthorized} username={username} />,
			errorElement: <Error />,
			children: [
				{
					path: '/login',
					element: <Login
						isAuthorized={isAuthorized}
						setAuthorized={setAuthorized}
						setUsername={setUsername}
					/>
				},
				{
					path: '/register',
					element: <Register
						isAuthorized={isAuthorized}
						setAuthorized={setAuthorized}
						setReturnedUsername={setUsername}
					/>,
					children: [
						{
							path: 'email',
							element: <RegisterEmail />
						},
						{
							path: 'username',
							element: <RegisterUsername />
						},
						{
							path: 'password',
							element: <RegisterPassword />
						}
					]
				},
				{
					path: '/',
					element: <Home isAuthorized={isAuthorized} />,
					loader: homeLoader(isAuthorized)
				},
				{
					path: '/search',
					element: <Search />,
				},
				{
					path: '/:username',
					element: <Profile
						isAuthorized={isAuthorized}
						username={username}
					/>,
					loader: profileLoader
				},
				{
					path: '/settings',
					element: <Settings
						isAuthorized={isAuthorized}
						setAuthorized={setAuthorized}
						setUsername={setUsername}
					/>
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
		<Index />
	</React.StrictMode>
);