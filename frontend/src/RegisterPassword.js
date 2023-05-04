import { useOutletContext, Link } from 'react-router-dom';

export default function RegisterPassword() {
	const context = useOutletContext();
	const password = context[5];
	const handlePassword = context[6];
	// const [password, handlePassword] = useOutletContext();
	// console.log(password);

	return (
		<>
			<label htmlFor='password-input'>Password:</label>
			<input
				id='password-input'
				type='password'
				value={password}
				onChange={handlePassword}
			/>
			<nav className='register-nav'>
				<Link to={'/register/username'}>Back</Link>
			</nav>
		</>
	);
}