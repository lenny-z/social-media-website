import Alert from './Alert.js';
// const alerts = [];

// export function pushAlert(body) {
// 	alerts.push(body);
// 	console.log(alerts);
// }

export default function AlertsList({ alerts }) {
	console.log(alerts);
	const renderAlerts = alerts.map(
		alert =>
			<li key={alert.id}>
				<Alert
					body={alert.body}
				/>
			</li>
	);

	return (
		<ol>
			{renderAlerts}
		</ol>
	);
}

// exports.render = () => {
// };