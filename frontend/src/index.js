import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.js';
import Error from './Error.js';
import Login from './Login.js';
import Register from './Register.js';
import Home, {loader as homeLoader} from './Home.js';
import Search from './Search.js';
import Profile, {loader as profileLoader} from './Profile.js';
import Settings from './Settings.js';

const router = createBrowserRouter([
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
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Home />,
				loader: homeLoader
			},
			{
				path: '/search',
				element: <Search />
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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);