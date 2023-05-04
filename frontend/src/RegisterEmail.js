import { useOutletContext, Link } from 'react-router-dom';

const validator = require('@lenny_zhou/validator');

export default function RegisterEmail() {
	const context = useOutletContext();
	const email = context[0];
	const handleEmail = context[1];
	// const emailIsValid = context[2];
	const emailIsValid = validator.email(email);

	return (
		<>
			<label htmlFor='email-input'>Email:</label>
			<input
				id='email-input'
				type='text'
				value={email}
				onChange={handleEmail}
			/>
			<div>{`Email is valid: ${emailIsValid ? '✅' : '❌'}`}</div>
			<Link to={'/register/username'}>Next</Link>
		</>
	);
}