import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavPanel from './NavPanel.js';
import Alert from './Alert.js';
import './css/App.css';

const MAX_NUM_ALERTS = process.env.REACT_APP_MAX_NUM_ALERTS;

export default function App({ isAuthorized, username }) {
	const [alerts, setAlerts] = useState([]);

	function deleteAlert(index) {
		return () => {
			let newAlerts = alerts.slice();
			newAlerts.splice(index, 1);
			setAlerts(newAlerts);
		};
	}

	const renderAlerts = alerts.map((alert, index) => {
		return (<li key={index}>
			<Alert
				id={index}
				body={alert}
				deleteThis={deleteAlert(index)}
			/>
		</li>);
	});

	function pushAlert(body) {
		let newAlerts = alerts.slice();
		newAlerts.push(body);

		if (newAlerts.length > MAX_NUM_ALERTS) {
			newAlerts = newAlerts.slice(-MAX_NUM_ALERTS);
		}

		setAlerts(newAlerts);
	}


	return (
		<>
			<NavPanel isAuthorized={isAuthorized} username={username} />
			<div id='content-panel'>
				<Outlet context={[pushAlert]} />
			</div>
			<ol id='alerts-list'>
				{renderAlerts}
			</ol>
		</>
	);
}