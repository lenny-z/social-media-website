import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		console.log('handleSubmit(event):');

		const user = {
			username: username,
			password: password
		};

		try {
			const res = await axios.post(process.env.REACT_APP_LOGIN, user, {withCredentials: true});
			console.log(`\tres.data: ${res.data}`);

			if (res.status === 200) { // 200 OK
				navigate('/home');
			}
		} catch (err) {
			if (err.response) {
				if (err.response.status === 401) { // 401 Unauthorized
					setUsername('');
					setPassword('');
				}
			}
		}
	}

	function handleUsername(event) {
		setUsername(event.target.value);
	}

	function handlePassword(event) {
		setPassword(event.target.value);
	}

	return (
		<form id='login-form' onSubmit={handleSubmit}>
			<label htmlFor='username-input'>Username: </label>
			<input
				id='username-input'
				type='text'
				value={username}
				onChange={handleUsername}
			/>
			<label htmlFor='password-input'>Password: </label>
			<input
				id='password-input'
				type='password'
				value={password}
				onChange={handlePassword}
			/>
			<input
				type='submit'
				value='Log In'
			/>
			<Link to={'register'}>Register</Link>
		</form>
	);
}