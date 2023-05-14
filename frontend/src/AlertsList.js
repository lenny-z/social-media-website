import Alert from './Alert.js';
import './css/AlertsList.css';

export default function AlertsList({ alerts }) {
	function deleteAlert(index) {
		return () => {

		}
	}

	const renderAlerts = alerts.map((alert, index) => {
		<li key={index}>
			<Alert
				body={alert.body}
				deleteThis={alert.deleteThis}
			/>
		</li>
	});
	// alert =>
	// 	<li key={alert.id}>
	// 		<Alert
	// 			id={alert.id}
	// 			body={alert.body}
	// 			deleteThis={alert.deleteThis}
	// 		/>
	// 	</li>

	return (
		<ol id='alerts-list'>
			{renderAlerts}
		</ol>
	);
}