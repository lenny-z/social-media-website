import { useOutletContext, Link } from 'react-router-dom';

const validator = require('@lenny_zhou/validator');

export default function RegisterUsername() {
	const context = useOutletContext();
	const showValid = context[0];
	const username = context[3];
	const handleUsername = context[4];

	const reqs = validator.username(username);

	return (
		<>
			<label htmlFor='username-input'>Username:</label>
			<input
				id='username-input'
				type='text'
				value={username}
				onChange={handleUsername}
			/>
			<div className='validations'>
				{
					showValid(
						`Valid sequence of characters`,
						reqs.isString
					)
				}
				<br />
				{
					showValid(
						`At least one character long`,
						reqs.lengthAtLeast1
					)
				}
				<br />
				{
					showValid(
						`At most 32 characters long`,
						reqs.lengthAtMost32
					)
				}
				<br />
				{
					showValid(
						`Only alphanumerics, underscores, and hyphens`,
						reqs.allowedCharsOnly
					)
				}
			</div>
			<nav className='register-nav'>
				<Link to={'/register/email'}>Back</Link>
				<Link to={'/register/password'}>Next</Link>
			</nav>
		</>
	)
}