import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavPanel from './NavPanel.js';
import './css/App.css';

const util = require('@lenny_zhou/util');

export default function App() {
	const [isAuthorized, setAuthorized] = useState(false);
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
				setAuthorized(false);
				navigate('/login'); //implement a better flow later
			}
		}
	}

	useEffect(() => {
		getAuthorized();
	}, []);

	return (
		<>
			<NavPanel isAuthorized={isAuthorized} />
			<Outlet />
		</>
	);
}