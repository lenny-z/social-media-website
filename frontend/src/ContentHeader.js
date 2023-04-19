// export default function ContentHeader({contentHeader}){
// 	return(
// 		<header id='content-header'>{contentHeader}</header>
// 	)
// }

import './css/ContentHeader.css';

export default function ContentHeader({ children }) {
	return (
		<header id='content-header'>
			{children}
		</header>
	);
}