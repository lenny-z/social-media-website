import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
import RegisterProgress from './RegisterProgress.js';
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
	const [retypePassword, setRetypePassword] = useState('');

	const emailReqsMet = validator.email(email);
	const usernameReqsMet = validator.username(username);
	const passwordReqsMet = validator.password(password);

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

	async function handleSubmit(event) {
		event.preventDefault();

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
				<RegisterProgress
					emailIsValid={validator.allReqsMet(emailReqsMet)}
					usernameIsValid={validator.allReqsMet(usernameReqsMet)}
					passwordIsValid={validator.allReqsMet(passwordReqsMet)}
				/>
				<ContentBody>
					<Outlet context={[			// Indices:
						showValid,				// 0
						email,					// 1
						handleEmail,			// 2
						emailReqsMet,			// 3
						username,				// 4
						handleUsername,			// 5
						usernameReqsMet,		// 6
						password,				// 7
						handlePassword,			// 8
						retypePassword,			// 9
						handleRetypePassword,	// 10
						passwordReqsMet,		// 11
						handleSubmit			// 12
					]} />
				</ContentBody>
			</>}
		</>
	);
}