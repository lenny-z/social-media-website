import { Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavPanel from './NavPanel.js';
import './css/App.css';

const util = require('@lenny_zhou/util');

export async function loader() {
	util.log('App.loader:');
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
	const [isAuthorized, setAuthorized] = useState(data.isAuthorized);
	const username = data.username;
	const navigate = useNavigate();

	// if (!isAuthorized) {
	// 	navigate('/login');
	// }

	useEffect(() => {
		if (!isAuthorized) {
			navigate('/login');
		}
	}, [isAuthorized]);

	return (
		<>
			<NavPanel isAuthorized={isAuthorized} username={username} />
			<div id='content-panel'>
				<Outlet context={[isAuthorized, setAuthorized, username]} />
			</div>
		</>
	);
}