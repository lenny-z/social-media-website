import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';

const EMAIL_COL = process.env.REACT_APP_EMAIL_COL;
const USERNAME_COL = process.env.REACT_APP_USERNAME_COL;
const EMAIL_REGEX = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

export default function Register() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();

		const user = {};
		user[EMAIL_COL] = email;
		user[USERNAME_COL] = username;
		user['password'] = password;

		try {
			const res = await axios.post(process.env.REACT_APP_REGISTER, user, { withCredentials: true });

			if (res.status === 201) {
				navigate('/home');
			}
		} catch (err) {
			if (err.response && err.response.status === 500) {
				window.alert('Sorry, please try again.');
			}
		}
	}

	function handleUsername(event) {
		setUsername(event.target.value);
	}

	function handleEmail(event) {
		setEmail(event.target.value);
	}

	function handlePassword(event) {
		setPassword(event.target.value);
	}

	return (
		<form id='register-form' onSubmit={handleSubmit}>
			<label htmlFor='email-input'>Email: </label>
			<input
				id='email-input'
				type='text'
				value={email}
				onChange={handleEmail}
			/>
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
				value='Register'
			/>
		</form>
	);
}