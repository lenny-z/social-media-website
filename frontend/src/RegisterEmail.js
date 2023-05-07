import { useOutletContext, Link } from 'react-router-dom';

// const validator = require('@lenny_zhou/validator');

export default function RegisterEmail() {
	const context = useOutletContext();
	const showValid = context[0];
	const email = context[1];
	const handleEmail = context[2];
	const emailIsValid = context[3];

	return (
		<>
			<label htmlFor='email-input'>Email:</label>
			<input
				id='email-input'
				type='text'
				value={email}
				onChange={handleEmail}
			/>
			<div className='validations'>
				{showValid('Email is valid', emailIsValid)}
			</div>
			<nav className='register-nav'>
				<Link to={'/register/username'}>Next</Link>
			</nav>
		</>
	);
}