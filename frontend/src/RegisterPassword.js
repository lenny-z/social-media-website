import { useOutletContext, Link } from 'react-router-dom';

const validator = require('@lenny_zhou/validator');

export default function RegisterPassword() {
	const context = useOutletContext();
	const showValid = context[0];
	const password = context[5];
	const handlePassword = context[6];
	const retypePassword = context[7];
	const handleRetypePassword = context[8];
	// const [password, handlePassword] = useOutletContext();
	// console.log(password);
	const reqs = validator.password(password);

	return (
		<>
			<form>
				<label htmlFor='password-input'>Password:</label>
				<input
					id='password-input'
					type='password'
					value={password}
					onChange={handlePassword}
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
							`At least 14 characters long`,
							reqs.lengthAtLeast14
						)
					}
					<br />
					{
						showValid(
							`At most 128 characters long`,
							reqs.lengthAtMost128
						)
					}
				</div>
				<label htmlFor='retype-password-input'>Retype password:</label>
				<input
					id='retype-password-input'
					type='password'
					value={retypePassword}
					onChange={handleRetypePassword}
				/>
				<div className='validations'>
					{
						showValid(
							'Retyped password matches password',
							password === retypePassword
						)
					}
				</div>
				<nav className='register-nav'>
					<Link to={'/register/username'}>Back</Link>
					<input
						type='submit'
						value='Register'
					/>
				</nav>
			</form>
		</>
	);
}