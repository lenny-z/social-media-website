import { useOutletContext, Link } from 'react-router-dom';

export default function RegisterPassword() {
	const context = useOutletContext();
	const showValid = context[0];
	const password = context[7];
	const handlePassword = context[8];
	const retypePassword = context[9];
	const handleRetypePassword = context[10];
	const reqs = context[11];
	const handleSubmit = context[12];

	return (
		<>
			<form onSubmit={handleSubmit}>
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