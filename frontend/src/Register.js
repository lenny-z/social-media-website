import { useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
// import RegisterProgress from './RegisterProgress.js';
import './css/Register.css';

const validator = require('@lenny_zhou/validator');

export default function Register({
	isAuthorized,
	setAuthorized,
	setReturnedUsername
}) {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [retypedPassword, setRetypedPassword] = useState('');

	const emailReqs = validator.email(email);
	const usernameReqs = validator.username(username);
	const passwordReqs = validator.password(password, retypedPassword);

	const pushAlert = useOutletContext()[0];

	function showValid(label, condition) {
		return `${label}: ${condition === true ? '✅' : '❌'}`;
	}

	function handleEmail(event) {
		setEmail(event.target.value);
	}

	function handleUsername(event) {
		setUsername(event.target.value);
	}

	function handlePassword(event) {
		setPassword(event.target.value);
	}

	function handleRetypedPassword(event) {
		setRetypedPassword(event.target.value);
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (
			!validator.allReqsMet(emailReqs)
			|| !validator.allReqsMet(usernameReqs)
			|| !validator.allReqsMet(passwordReqs)
		) {
			pushAlert('invalid');
			return;
		}

		const user = {
			email: email,
			username: username,
			password: password
		};

		try {
			const res = await axios.post(process.env.REACT_APP_REGISTER, user,
				{ withCredentials: true });

			if (res.status === 201) {
				setAuthorized(true);
				setReturnedUsername(res.data);
			}
		} catch (err) {
			if (err.response && err.response.status === 500) {
				window.alert('Sorry, please try again.');
			}
		}
	}

	return (
		<>
			{isAuthorized === true && <Navigate to='/' />}
			{!isAuthorized && <>
				<ContentHeader>
					Register
				</ContentHeader>
				<ContentBody>
					<form onSubmit={handleSubmit}>
						<label htmlFor='email-input'>Email:</label>
						<input
							id='email-input'
							type='text'
							value={email}
							onChange={handleEmail}
						/>
						<label htmlFor='username-input'>Username:</label>
						<input
							id='username-input'
							type='text'
							value={username}
							onChange={handleUsername}
						/>
						<label htmlFor='password-input'>Password:</label>
						<input
							id='password-input'
							type='password'
							value={password}
							onChange={handlePassword}
						/>
						<label htmlFor='retype-password-input'>Retype password:</label>
						<input
							id='retype-password-input'
							type='password'
							value={retypedPassword}
							onChange={handleRetypedPassword}
						/>
						<input
							type='submit'
							value='Register'
						/>
					</form>
				</ContentBody>
			</>}
		</>
	);
}