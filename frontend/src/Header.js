import React from 'react';

// export default class Header extends React.Component {
export default function Header() {
	// render() {
		return (
			<header>
				{/* {process.env.REACT_APP_NAME} */}
				<div id='nav-header'>
					{process.env.REACT_APP_NAME}
				</div>
				<div id='content-header'>
				</div>
			</header>
		);
	// }
}