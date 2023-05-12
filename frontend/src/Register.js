import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
import RegisterProgress from './RegisterProgress.js';
import Popup from './Popup.js';
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
	const [showPopup, setShowPopup] = useState(false);
	const [popupBody, setPopupBody] = useState('');

	const emailReqs = validator.email(email);
	const usernameReqs = validator.username(username);
	const passwordReqs = validator.password(password, retypedPassword);

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
		setRetypedPassword(event.target.value);
	}

	function handleAcknowledgePopup() {
		setShowPopup(false);
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (
			!validator.allReqsMet(emailReqs)
			|| !validator.allReqsMet(usernameReqs)
			|| !validator.allReqsMet(passwordReqs)
		) {
			setShowPopup(true);
			setPopupBody('Some requirements not met.') // TODO: make more descriptive
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
				<RegisterProgress
					emailIsValid={validator.allReqsMet(emailReqs)}
					usernameIsValid={validator.allReqsMet(usernameReqs)}
					passwordIsValid={validator.allReqsMet(passwordReqs)}
				/>
				<ContentBody>
					<Outlet context={[			// Indices:
						showValid,				// 0
						email,					// 1
						handleEmail,			// 2
						emailReqs,				// 3
						username,				// 4
						handleUsername,			// 5
						usernameReqs,			// 6
						password,				// 7
						handlePassword,			// 8
						retypedPassword,		// 9
						handleRetypePassword,	// 10
						passwordReqs,			// 11
						handleSubmit			// 12
					]} />
				</ContentBody>
			</>}
			{showPopup === true && <Popup
				body={popupBody}
				handleAcknowledge={handleAcknowledgePopup}
			/>}
		</>
	);
}