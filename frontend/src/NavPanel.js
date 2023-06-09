import { Link } from 'react-router-dom';
import './css/NavPanel.css';

export default function NavPanel({ isAuthorized, username }) {
	return (
		<nav id='nav-panel'>
			<header id='nav-header'>Social Network</header>
			<ol>
				<li><Link to={'/'}>Home</Link></li>
				{isAuthorized === true
					&& <li><Link to={`/${username}`}>Profile</Link></li>
				}
				{/* {isAuthorized && <li>Collections</li>} */}
				<li><Link to={'/search'}>Search</Link></li>
				{/* {isAuthorized && <li>Notifications</li>} */}
				{/* {isAuthorized && <li>Messages</li>} */}
				{isAuthorized === true
					&& <li><Link to={'/settings'}>Settings</Link></li>
				}
				{!isAuthorized && <li><Link to={'/login'}>Log In</Link></li>}
				{!isAuthorized && <li><Link to={'/register'}>Register</Link></li>}
			</ol>
		</nav>
	);
}