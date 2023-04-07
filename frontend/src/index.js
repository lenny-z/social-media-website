import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import App from './App.js';
import Error from './Error.js';
import Login from './Login.js';
import Register from './Register.js';
import Home from './Home.js';
import Search from './Search.js';
import Profile from './Profile.js';
import Settings from './Settings.js';

async function getProfilePosts({ params }) {
	console.log('index.getPosts:');

	try {
		// reqBody = {};
		// reqBody[process.env.REACT_APP_USERNAME_COL] = username;

		const res = await axios.get(
			// process.env.REACT_APP_PROFILE_POSTS,
			// reqBody,
			// { withCredentials: true }
			`${process.env.REACT_APP_PROFILE_POSTS}/${params.username}`
		);

		if (res.status === 200) {
			console.log(`\tres.data: ${JSON.stringify(res.data)}`);
			const data = res.data;
			console.log({data});
			// setPosts(res.data);
			return data;
		}
	} catch (err) {
		console.log(err);
		return null;
	}
}

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
				element: <Profile />,
				loader: getProfilePosts
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