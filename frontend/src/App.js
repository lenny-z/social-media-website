import React from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './css/App.css';

// export default class App extends React.Component {
	export default function App(){
	// render() {
		return (
			<>
				<Header />
				<div id='app-container'>
					<nav id='nav-panel'>
						<ol>
							<li><Link to={'/home'}>Home</Link></li>
							<li>Profile</li>
							<li>Collections</li>
							<li><Link to={'/search'}>Search</Link></li>
							<li>Notifications</li>
							<li>Messages</li>
						</ol>
					</nav>
					<div id='content-panel'>
						<Outlet />
					</div>
				</div>
			</>
		);
	// }
}