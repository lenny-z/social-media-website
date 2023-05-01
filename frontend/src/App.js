import { Outlet } from 'react-router-dom';
import NavPanel from './NavPanel.js';
import './css/App.css';


export default function App({ isAuthorized, username }) {
	return (
		<>
			<NavPanel isAuthorized={isAuthorized} username={username} />
			<div id='content-panel'>
				<Outlet />
			</div>
		</>
	);
}