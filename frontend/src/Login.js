import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './css/Login.css';

export default function Login() {
	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		console.log('Login.handleSubmit:');

		const user = {
			identifier: identifier,
			password: password
		};

		try {
			const res = await axios.post(process.env.REACT_APP_LOGIN, user,
				{ withCredentials: true });

			console.log(`\tres.data: ${res.data}`);

			if (res.status === 200) { // 200 OK
				navigate('/home');
			}
		} catch (err) {
			if (err.response && err.response.status === 401) { // 401 Unauthorized
				setIdentifier('');
				setPassword('');
			}
		}
	}

	function handleIdentifier(event) {
		setIdentifier(event.target.value);
	}

	function handlePassword(event) {
		setPassword(event.target.value);
	}

	return (
		<form id='login-form' onSubmit={handleSubmit}>
			<label htmlFor='identifier-input'>Email or username: </label>
			<input
				id='identifier-input'
				type='text'
				value={identifier}
				onChange={handleIdentifier}
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
			<Link to={'/register'}>Register</Link>
		</form>
	);
}