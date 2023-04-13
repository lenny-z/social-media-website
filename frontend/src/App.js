import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
import axios from 'axios';
import './css/App.css';

const util = require('@lenny_zhou/util');

export default function App() {
	// const data = useRouteLoaderData('root');
	// console.log('App.data: ' + data);
	const [isAuthorized, setAuthorized] = useState(false);
	// const [contentHeader, setContentHeader] = useState('content header');
	const navigate = useNavigate();

	async function getAuthorized() {
		util.log('App.isAuthorized:');

		try {
			const res = await axios.get(process.env.REACT_APP_AUTHORIZE,
				{ withCredentials: true });

			if (res.status === 200) {
				setAuthorized(true);
			}
		} catch (err) {
			if (err.response && err.response.status === 401) {
				// setAuthorized(false);
				navigate('/login'); //implement a better flow later
			}
		}
	}

	useEffect(() => {
		getAuthorized();
	}, []);

	return (
		<div id='app-container'>
			<nav id='nav-panel'>
				<header id='nav-header'>Social Network</header>
				<ol>
					<li><Link to={'/'}>Home</Link></li>
					{isAuthorized && <li>Profile</li>}
					{isAuthorized && <li>Collections</li>}
					<li><Link to={'/search'}>Search</Link></li>
					{isAuthorized && <li>Notifications</li>}
					{isAuthorized && <li>Messages</li>}
					<li><Link to={'/settings'}>Settings</Link></li>
				</ol>
			</nav>
			<div id='content-panel'>
				<Outlet />
			</div>
		</div>
	);
}