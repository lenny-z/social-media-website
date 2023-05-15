import { useState } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
import Validations from './Validations.js';
import './css/Auth.css';

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

	const validateEmail = validator.email(email);
	const validateUsername = validator.username(username);
	const validatePassword = validator.password(password);
	const validateRetypedPassword = validator.retypedPassword(retypedPassword);

	const emailReqsNotMet = validator.reqsNotMet(
		// validator.email(email)
		validateEmail
	);

	const usernameReqsNotMet = validator.reqsNotMet(
		// validator.username(username)
		validateUsername
	);

	const passwordReqsNotMet = validator.reqsNotMet(
		// validator.password(password)
		validatePassword
	);

	const retypedPasswordReqsNotMet = validator.reqsNotMet(
		// validator.retypedPassword(password, retypedPassword)
		validateRetypedPassword
	);

	const pushAlert = useOutletContext()[0];

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
			// !validator.allReqsMet(emailReqsNotMet)
			// || !validator.allReqsMet(usernameReqsNotMet)
			// || !validator.allReqsMet(passwordReqsNotMet)
			// || !validator.allReqsMet()
			!validator.allReqsMet(validateEmail)
			|| !validator.allReqsMet(validateUsername)
			|| !validator.allReqsMet(validatePassword)
			|| !validator.allReqsMet(validateRetypedPassword)
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
						<Validations reqsNotMet={emailReqsNotMet} />
						<label htmlFor='username-input'>Username:</label>
						<input
							id='username-input'
							type='text'
							value={username}
							onChange={handleUsername}
						/>
						<Validations reqsNotMet={usernameReqsNotMet} />
						<label htmlFor='password-input'>Password:</label>
						<input
							id='password-input'
							type='password'
							value={password}
							onChange={handlePassword}
						/>
						<Validations reqsNotMet={passwordReqsNotMet} />
						<label htmlFor='retyped-password-input'>Retype password:</label>
						<input
							id='retyped-password-input'
							type='password'
							value={retypedPassword}
							onChange={handleRetypedPassword}
						/>
						<Validations reqsNotMet={retypedPasswordReqsNotMet} />
						<input
							type='submit'
							value='Register'
							className='hoverable'
						/>
					</form>
				</ContentBody>
			</>}
		</>
	);
}