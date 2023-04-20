import './css/ContentPanel.css';

// export default function ContentPanel({ children }) {
// 	return (
// 		<div id='content-panel'>{children}</div>
// 	);
// }

export default function ContentPanel({ header, body }) {
	return (
		<div id='content-panel'>
			<header id='content-header'>
				{header}
			</header>
			<div id='content-body'>
				{body}
			</div>
		</div>
	);
}