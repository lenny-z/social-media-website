import { Outlet, useLoaderData } from 'react-router-dom';
import { useState, } from 'react';
import axios from 'axios';
import NavPanel from './NavPanel.js';
import './css/App.css';

// export async function getAuthorized(){
// 	try{
// 		const res = await axios.get(
// 			process.env.REACT_APP_AUTHORIZE,
// 			{withCredentials: true}
// 		);

// 		if(res.status === 200){
// 			const out = {
// 				isAuthorized: true,
// 				username: res.data.username
// 			}

// 			return out;
// 		}

// 		throw new Error('NOT 200');
// 	}catch(err){
// 		console.error(err);
// 		throw err;
// 	}
// }

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
			data.username = res.data;
		}
	} catch (err) {
		console.error(err);
	}

	return data;
}

export default function App() {
	const data = useLoaderData();
	const [isAuthorized, setAuthorized] = useState(data.isAuthorized);
	const [username, setUsername] = useState(data.username);

	return (
		<>
			<NavPanel isAuthorized={isAuthorized} username={username} />
			<div id='content-panel'>
				<Outlet context={[
					isAuthorized,
					setAuthorized,
					username,
					setUsername
				]} />
			</div>
		</>
	);
}