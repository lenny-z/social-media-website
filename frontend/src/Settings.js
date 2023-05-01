import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
import './css/Settings.css';

export default function Settings({ isAuthorized, setAuthorized, setUsername }) {
	// const navigate = useNavigate();
	console.log('re-rendered');
	// const setAuthorized = useOutletContext()[1];
	// const setUsername = useOutletContext()[3];

	async function handleLogout() {
		try {
			const res = await axios.post(
				process.env.REACT_APP_LOGOUT,
				{},
				{ withCredentials: true }
			);

			if (res.status === 200) {
				setAuthorized(false);
				setUsername(null);
				// navigate('/');
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			{isAuthorized === true && <>
				<ContentHeader>Settings</ContentHeader>
				<ContentBody>
					<input
						type='button'
						value='Log Out'
						onClick={handleLogout}
					/>
				</ContentBody>
			</>}
			{!isAuthorized && <Navigate to='/' />}
		</>
	)
}