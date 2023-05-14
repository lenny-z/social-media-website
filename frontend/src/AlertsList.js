import Alert from './Alert.js';
import './css/AlertsList.css';

export default function AlertsList({ alerts }) {
	const renderAlerts = alerts.map(
		alert =>
			<li key={alert.id}>
				<Alert
					body={alert.body}
					deleteThis={alert.deleteThis}
				/>
			</li>
	);

	return (
		<ol id='alerts-list'>
			{renderAlerts}
		</ol>
	);
}