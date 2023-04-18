import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavPanel from './NavPanel.js';
import ContentHeader from './ContentHeader.js';
import './css/App.css';

const util = require('@lenny_zhou/util');

export default function App() {
	const location = useLocation();
	const [contentHeader, setContentHeader] = useState(null);
	const [isAuthorized, setAuthorized] = useState(false);
	const navigate = useNavigate();

	// let contentHeader = null;

	useEffect(() => {
		switch (location.pathname) {
			case '/':
				// contentHeader = 'Home';
				setContentHeader('Home');
				break;

			default:
				// contentHeader = '';
				setContentHeader('No Content Header');
		}

		util.log(contentHeader);
	}, [location.pathname]);

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
		<>
			<NavPanel />
			<ContentHeader contentHeader={contentHeader} />
			<div id='content-panel'>
				<Outlet />
			</div>
		</>
	);
}