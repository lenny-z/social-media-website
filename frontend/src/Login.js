import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
// import './css/Login.css';
import './css/Auth.css';

export default function Login({ isAuthorized, setAuthorized, setUsername }) {
	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');

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

			if (res.status === 200) { // 200 OK
				setAuthorized(true);
				setUsername(res.data);
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
		<>
			{!isAuthorized && <>
				<ContentHeader>
					Login
				</ContentHeader>
				<ContentBody>
					<form onSubmit={handleSubmit}>
						<label htmlFor='identifier-input'>Email or username:</label>
						<input
							id='identifier-input'
							type='text'
							value={identifier}
							onChange={handleIdentifier}
						/>
						<label htmlFor='password-input'>Password:</label>
						<input
							id='password-input'
							type='password'
							value={password}
							onChange={handlePassword}
						/>
						<input
							className='hoverable'
							type='submit'
							value='Log In'
						/>
					</form>
					<Link to={'/register'}>Register</Link>
				</ContentBody>
			</>}
			{isAuthorized === true && <Navigate to='/' />}
		</>
	);
}