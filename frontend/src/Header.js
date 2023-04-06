// import {useState} from 'react';
import './css/Header.css';

export default function Header({contentHeader}) {
	return (
		<header>
			<div id='nav-header'>
				{process.env.REACT_APP_NAME}
			</div>
			<div id='content-header'>
				{contentHeader}
			</div>
		</header>
	);
}