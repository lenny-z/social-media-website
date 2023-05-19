import { useState, useEffect } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import * as validator from '@lenny_zhou/validator';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
import Validations from './Validations.js';
import './css/Auth.css';

export default function Register({
	isAuthorized,
	setAuthorized,
	setReturnedUsername
}) {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [retypedPassword, setRetypedPassword] = useState('');
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [emailReqsNotMet, setEmailReqsNotMet] = useState([]);
	const [usernameIsValid, setUsernameIsValid] = useState(false)
	const [usernameReqsNotMet, setUsernameReqsNotMet] = useState([]);

	async function validateField(
		field,
		fieldValidator,
		setIsValid,
		setReqsNotMet
	){
		const validation = await fieldValidator(field);
		const isValid = validator.allReqsMet(validation) === true;
		setIsValid(isValid);
	
		if(!isValid){
			setReqsNotMet(validator.reqsNotMet(validation));
		}
	}

	async function validateEmail() {
		const emailValidation = await validator.email(email);
		const emailIsValid = validator.allReqsMet(emailValidation) === true;
		setEmailIsValid(emailIsValid);

		if (!emailIsValid) {
			setEmailReqsNotMet(validator.reqsNotMet(emailValidation));
		}
	}

	// useEffect(() => {
	// 	validateEmail();
	// }, [email]);

	useEffect(()=>{
		validateField(email, validator.email, setEmailIsValid, setEmailReqsNotMet);
	}, [email]);

	async function validateUsername() {
		const usernameValidation = await validator.username(username);
		const usernameIsValid = validator.allReqsMet(usernameValidation);
		setUsernameIsValid(usernameIsValid);

		if (!usernameIsValid) {
			setUsernameReqsNotMet(validator.reqsNotMet(usernameValidation));
		}
	}

	useEffect(() => {
		validateUsername();
	}, [username])


	// const validateUsername = validator.username(username);
	const validatePassword = validator.password(password);

	const validateRetypedPassword = validator.retypedPassword(
		password,
		retypedPassword
	);

	// const usernameIsValid = validator.allReqsMet(validateUsername) === true;
	const passwordIsValid = validator.allReqsMet(validatePassword) === true;

	const retypedPasswordIsValid = validator.allReqsMet(
		validateRetypedPassword
	);

	// const usernameReqsNotMet = validator.reqsNotMet(validateUsername);
	const passwordReqsNotMet = validator.reqsNotMet(validatePassword);

	const retypedPasswordReqsNotMet = validator.reqsNotMet(
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
			!emailIsValid
			|| !usernameIsValid
			// !usernameIsValid
			|| !passwordIsValid
			|| !retypedPasswordIsValid
		) {
			const alertBody = <>
				{!emailIsValid && <>
					<p>Email:</p>
					<Validations reqsNotMet={emailReqsNotMet} />
				</>}
				{!usernameIsValid && <>
					<p>Username:</p>
					<Validations reqsNotMet={usernameReqsNotMet} />
				</>}
				{!passwordIsValid && <>
					<p>Password:</p>
					<Validations reqsNotMet={passwordReqsNotMet} />
				</>}
				{!retypedPasswordIsValid && <>
					<p>Retyped password:</p>
					<Validations reqsNotMet={retypedPasswordReqsNotMet} />
				</>}
			</>;

			pushAlert(alertBody);
			return;
		}

		const user = {
			email: email,
			username: username,
			password: password,
			retypedPassword: retypedPassword
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
				pushAlert('Internal server error. Please try again.');
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
						{!emailIsValid &&
							<Validations reqsNotMet={emailReqsNotMet} />
						}
						{/* <Validations reqsNotMet={emailReqsNotMet} /> */}
						<label htmlFor='username-input'>Username:</label>
						<input
							id='username-input'
							type='text'
							value={username}
							onChange={handleUsername}
						/>
						{!usernameIsValid &&
							<Validations reqsNotMet={usernameReqsNotMet} />
						}
						<label htmlFor='password-input'>Password:</label>
						<input
							id='password-input'
							type='password'
							value={password}
							onChange={handlePassword}
						/>
						{!passwordIsValid &&
							<Validations reqsNotMet={passwordReqsNotMet} />
						}
						<label htmlFor='retyped-password-input'>Retype password:</label>
						<input
							id='retyped-password-input'
							type='password'
							value={retypedPassword}
							onChange={handleRetypedPassword}
						/>
						{!retypedPasswordIsValid &&
							<Validations reqsNotMet={retypedPasswordReqsNotMet} />
						}
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