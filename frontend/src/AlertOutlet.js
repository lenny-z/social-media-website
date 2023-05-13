import { useEffect } from 'react';
import Alert from './Alert.js';
const alerts = [];
// const alertsChanged = false;

export function pushAlert(body) {
	alerts.push(body);
	// console.log(alerts);
	// alertsChanged = true;
}

// exports.push = (body) => {
// 	popups.push(body);
// };

export default function AlertOutlet() {
	console.log(alerts);
	let renderAlerts;

	useEffect(() => {
		renderAlerts = alerts.map(
			alert =>
				<li>
					<Alert
						body={alert}
					/>
				</li>
		);
	}, [alerts.length]);

	return (
		<ol>
			{renderAlerts}
		</ol>
	);
}

// exports.render = () => {
// };