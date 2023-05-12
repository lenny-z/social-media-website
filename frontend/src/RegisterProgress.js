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
	// const path = useLocation().pathname;
	// var activeField = null;

	// if (locationToField.has(path)) {
	// 	activeField = locationToField.get(path);
	// }

	// function showValid(label, condition) {
	// 	return `${label} ${condition === true ? '✅' : '❌'}`;
	// }

	// function isActiveField(field) {
	// 	return (activeField === field) ? 'active' : '';
	// }

	return (
		<nav id='register-progress-nav'>
			<ol>
				{/* <li> */}
				<RegisterProgressLink
					to='/register/email'
					label='Email'
					isValid={emailIsValid}
				/>
				{/* </li> */}
				{/* <li> */}
				<RegisterProgressLink
					to='/register/username'
					label='Username'
					isValid={usernameIsValid}
				/>
				{/* </li> */}
				{/* <li> */}
				<RegisterProgressLink
					to='/register/password'
					label='Password'
					isValid={passwordIsValid}
				/>
				{/* </li> */}
			</ol>
		</nav>
	);
}