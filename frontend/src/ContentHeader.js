import './css/ContentHeader.css';

export default function ContentHeader({ children }) {
	return (
		<header id='content-header'>
			{children}
		</header>
	);
}