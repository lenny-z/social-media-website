import { Link, useLocation } from 'react-router-dom';

function RegisterProgressLink({ to, label, isValid }) {
	const isActive = useLocation().pathname === to;

	return (
		<li
			className={isActive === true ? 'active' : ''}
		>
			<Link
				to={to}
			>
				{`${label} ${isValid === true ? '✅' : '❌'}`}
			</Link>
		</li>
	);
}

export default function RegisterProgress({
	emailIsValid,
	usernameIsValid,
	passwordIsValid,
}) {
	return (
		<nav id='register-progress-nav'>
			<ol>
				<RegisterProgressLink
					to='/register/email'
					label='Email'
					isValid={emailIsValid}
				/>
				<RegisterProgressLink
					to='/register/username'
					label='Username'
					isValid={usernameIsValid}
				/>
				<RegisterProgressLink
					to='/register/password'
					label='Password'
					isValid={passwordIsValid}
				/>
			</ol>
		</nav>
	);
}