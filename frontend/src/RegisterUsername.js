import { useOutletContext } from 'react-router-dom';

const validator = require('@lenny_zhou/validator');

export default function RegisterUsername() {
	const context = useOutletContext();
	const username = context[2];
	const handleUsername = context[3];

	const reqs = validator.username(username);
	console.log(reqs);

	return (
		<>
			<label htmlFor='username-input'>Username:</label>
			<input
				id='username-input'
				type='text'
				value={username}
				onChange={handleUsername}
			/>
			<div>
			</div>
		</>
	)
}