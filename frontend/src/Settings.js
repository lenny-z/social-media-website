import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentPanel from './ContentPanel.js';
import './css/Settings.css';

export default function Settings() {
	const navigate = useNavigate();

	async function handleLogout() {
		console.log('Settings.handleLogout:');

		try {
			const res = await axios.post(process.env.REACT_APP_LOGOUT);

			if (res.status === 200) {
				navigate('/');
			}
		} catch (err) {
			console.log('Implement Settings.handleLogout error handling');
		}
	}

	return (
		<>
			<ContentHeader>Settings</ContentHeader>
			<ContentPanel>
				<input
					type='button'
					value='Log Out'
					onClick={handleLogout}
				/>
			</ContentPanel>
		</>
	)
}