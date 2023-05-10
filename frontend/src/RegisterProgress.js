import { Link } from 'react-router-dom';

export default function RegisterProgress({
	emailIsValid,
	usernameIsValid,
	passwordIsValid
}) {
	function showValid(label, condition) {
		return `${label} ${condition === true ? '✅' : '❌'}`;
	}

	return (
		<nav id='register-progress-nav'>
			<Link to='/register/email'>
				{showValid('Email', emailIsValid)}
			</Link>
			<Link to='/register/username'>
				{showValid('Username', usernameIsValid)}
			</Link>
			<Link to='/register/password'>
				{showValid('Password', passwordIsValid)}
			</Link>
		</nav>
	);
}