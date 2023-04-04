import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App.js';
import Error from './Error.js';
import Login from './Login.js';
import Register from './Register.js';
import Home from './Home.js';
import Search from './Search.js';
import Profile from './Profile.js';

// const profileRoute = <Route
// 	path='/:username'

// 	loader={({params}) => {
// 		console.log(params.username);
// 		return params.username;
// 	}}

// 	element={<Profile />}
// />;

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
				element: <Home />
			},
			{
				path: '/search',
				element: <Search />
			},
			{
				path: '/:username',
				element: <Profile />
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