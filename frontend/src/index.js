import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.js';
import Error from './Error.js';
import Login from './Login.js';
import Register from './Register.js';
import Home from './Home.js';
import Search from './Search.js';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			// {
			// 	path: '/',
			// 	element: <Login />
			// },
			{
				path: '/register',
				element: <Register />
			},
			{
				path: '/home',
				element: <Home />
			},
			{
				path: '/search',
				element: <Search />
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