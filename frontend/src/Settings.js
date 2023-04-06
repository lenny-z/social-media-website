import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './css/Settings.css';

export default function Settings() {
	const navigate = useNavigate();
	
	async function handleSubmit(event) {
		event.preventDefault();
		console.log('Settings.handleSubmit:');

		try {
			const res = await axios.post(process.env.REACT_APP_LOGOUT);

			if (res.status === 200) {
				navigate('/');
			}
		} catch (err) {
			console.log('Implement Settings.handleSubmit error handling');
		}
	}

	return (
		<form id='logout-form' onSubmit={handleSubmit}>
			<input
				type='submit'
				value='Log Out'
			/>
		</form>
	)
}