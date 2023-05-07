import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
import './css/Register.css';

// const validator = require('@lenny_zhou/validator');

export default function Register({
	isAuthorized,
	setAuthorized,
	setReturnedUsername
}) {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [retypePassword, setRetypePassword] = useState('');

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

	function handleRetypePassword(event) {
		setRetypePassword(event.target.value);
	}

	return (
		<>
			<ContentHeader>
				Register
			</ContentHeader>
			<ContentBody>
				<Outlet context={[			// Indices:
					showValid,				// 0
					email,					// 1
					handleEmail,			// 2
					username,				// 3
					handleUsername,			// 4
					password,				// 5
					handlePassword,			// 6
					retypePassword,			// 7
					handleRetypePassword,	// 8
					isAuthorized
				]} />
			</ContentBody>
		</>
	);

	// async function handleSubmit(event) {
	// 	event.preventDefault();

	// 	const user = {
	// 		email: email,
	// 		username: username,
	// 		password: password
	// 	};

	// 	try {
	// 		const res = await axios.post(process.env.REACT_APP_REGISTER, user,
	// 			{ withCredentials: true });

	// 		if (res.status === 201) {
	// 			setAuthorized(true);
	// 			setReturnedUsername(res.data);
	// 		}
	// 	} catch (err) {
	// 		if (err.response && err.response.status === 500) {
	// 			window.alert('Sorry, please try again.');
	// 		}
	// 	}
	// }




	// return (
	// 	<>
	// 		{isAuthorized === true && <Navigate to='/' />}
	// 		{!isAuthorized && <>
	// 			<ContentHeader>
	// 				Register
	// 			</ContentHeader>
	// 			<ContentBody>
	// 				<form onSubmit={handleSubmit}>
	// 					<label htmlFor='email-input'>Email: </label>
	// 					<input
	// 						id='email-input'
	// 						type='text'
	// 						value={email}
	// 						onChange={handleEmail}
	// 					/>
	// 					<label htmlFor='username-input'>Username: </label>
	// 					<input
	// 						id='username-input'
	// 						type='text'
	// 						value={username}
	// 						onChange={handleUsername}
	// 					/>
	// 					<label htmlFor='password-input'>Password: </label>
	// 					<input
	// 						id='password-input'
	// 						type='password'
	// 						value={password}
	// 						onChange={handlePassword}
	// 					/>
	// 					<input
	// 						type='submit'
	// 						value='Register'
	// 					/>
	// 				</form>
	// 			</ContentBody>
	// 		</>}
	// 	</>
	// );
}