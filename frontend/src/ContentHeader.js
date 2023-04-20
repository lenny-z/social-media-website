// import { forwardRef } from 'react';
// import FixedContent from './FixedContent.js';
import './css/ContentHeader.css';


// const ContentHeaderInner = forwardRef((props, ref) => {
// 	const { child } = props;

// 	return (
// 		<header id='content-header' ref={ref}>
// 			{child}
// 		</header>
// 	);
// });

// function renderContentHeader(child, heightRef){
// 	return <ContentHeaderInner child={child} ref={heightRef}/>;
// }

// export default function ContentHeader({children}){
// 	return <FixedContent child={children} renderChild={renderContentHeader}/>;
// }

export default function ContentHeader({ children }) {
	return (
		<header id='content-header'>
			{children}
		</header>
	);
}