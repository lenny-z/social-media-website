import { Link, useLocation } from 'react-router-dom';

// const locationToField = new Map();
// locationToField.set('/register/email', 'email');
// locationToField.set('/register/username', 'username');
// locationToField.set('/register/password', 'password');

function RegisterProgressLink({ to, label, isValid }) {
	const isActive = useLocation().pathname === to;

	return (
		<Link
			to={to}
			className={isActive === true ? 'active' : ''}
		>
			{`${label} ${isValid === true ? '✅' : '❌'}`}
		</Link>
	);
}

export default function RegisterProgress({
	emailIsValid,
	usernameIsValid,
	passwordIsValid,
}) {
	const path = useLocation().pathname;
	var activeField = null;

	if (locationToField.has(path)) {
		activeField = locationToField.get(path);
	}

	function showValid(label, condition) {
		return `${label} ${condition === true ? '✅' : '❌'}`;
	}

	function isActiveField(field) {
		return (activeField === field) ? 'active' : '';
	}

	return (
		<nav id='register-progress-nav'>
			{/* <Link
				to='/register/email'
				className={isActiveField('email')}
			>
				{showValid('Email', emailIsValid)}
			</Link>
			<Link
				to='/register/username'
				className={isActiveField('username')}
			>
				{showValid('Username', usernameIsValid)}
			</Link>
			<Link
				to='/register/password'
				className={isActiveField('password')}
			>
				{showValid('Password', passwordIsValid)}
			</Link> */}
			<RegisterProgressLink
				to='/register/email'
				label='Email'
			/>
		</nav>
	);
}