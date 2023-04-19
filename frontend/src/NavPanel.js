import {Link} from 'react-router-dom';
import './css/NavPanel.css';

export default function NavPanel({isAuthorized}) {
	return (
		<nav id='nav-panel'>
			<header id='nav-header'>Social Network</header>
			<ol>
				<li><Link to={'/'}>Home</Link></li>
				{isAuthorized && <li>Profile</li>}
				{isAuthorized && <li>Collections</li>}
				<li><Link to={'/search'}>Search</Link></li>
				{isAuthorized && <li>Notifications</li>}
				{isAuthorized && <li>Messages</li>}
				<li><Link to={'/settings'}>Settings</Link></li>
			</ol>
		</nav>
	);
}