// import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import NavPanel from './NavPanel.js';
import './css/App.css';
// import getUsername from './lib/getUsername.js';

const util = require('@lenny_zhou/util');

export async function loader() {
	const data = {
		isAuthorized: false,
		username: null
	};

	try {
		const res = await axios.get(
			process.env.REACT_APP_AUTHORIZE,
			{ withCredentials: true }
		);

		if (res.status === 200) {
			data.isAuthorized = true;
			data.username = res.data.username;
		}
	} catch (err) {
		console.log(err);
	}

	return data;
}

export default function App() {
	const data = useLoaderData();
	// const [isAuthorized, setAuthorized] = useState(false);
	const navigate = useNavigate();

	if (data.isAuthorized === false) {
		navigate('/login');
	}

	return (
		<>
			<NavPanel isAuthorized={data.isAuthorized} username={data.username} />
			<div id='content-panel'>
				<Outlet />
			</div>
		</>
	);
}