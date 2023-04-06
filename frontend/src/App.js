import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.js';
import './css/App.css';

export default function App() {
	const [isAuthorized, setAuthorized] = useState(false);
	const [contentHeader, setContentHeader] = useState('content header');
	const navigate = useNavigate();

	async function getAuthorized() {
		console.log('isAuthorized:');

		try {
			const res = await axios.get(
				process.env.REACT_APP_ROOT,
				{ withCredentials: true }
			);

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
		<>
			<Header contentHeader={contentHeader} />
			<div id='app-container'>
				<nav id='nav-panel'>
					<ol>
						<li><Link to={'/'}>Home</Link></li>
						<li>Profile</li>
						<li>Collections</li>
						<li><Link to={'/search'}>Search</Link></li>
						<li>Notifications</li>
						<li>Messages</li>
						<li><Link to={'/settings'}>Settings</Link></li>
					</ol>
				</nav>
				<div id='content-panel'>
					<Outlet />
				</div>
			</div>
		</>
	);
}