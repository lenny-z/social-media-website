import { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import NavPanel from './NavPanel.js';
import AlertsList from './AlertsList.js';
import './css/App.css';

const MAX_NUM_ALERTS = process.env.REACT_APP_MAX_NUM_ALERTS;

export default function App({ isAuthorized, username }) {
	const [alerts, setAlerts] = useState([]);
	const idRef = useRef(0);

	function deleteAlert(id) {
		console.log(id);
		return () => {
			let newAlerts = alerts.slice();

			for (const index in newAlerts) {
				if (newAlerts[index].id === id) {
					newAlerts.splice(index, 1);
					break;
				}
			}

			setAlerts(newAlerts);
		}
	}

	function pushAlert(body) {
		let newAlerts = alerts.slice();

		newAlerts.push({
			id: idRef.current,
			body: body,
			deleteThis: deleteAlert(idRef.current)
		});

		if (newAlerts.length > MAX_NUM_ALERTS) {
			newAlerts = newAlerts.slice(-MAX_NUM_ALERTS);
		}

		setAlerts(newAlerts);
		idRef.current = idRef.current + 1;
	}


	return (
		<>
			<NavPanel isAuthorized={isAuthorized} username={username} />
			<div id='content-panel'>
				<Outlet context={[pushAlert]} />
			</div>
			<AlertsList alerts={alerts} />
		</>
	);
}