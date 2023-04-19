import { forwardRef } from 'react';
import FixedContent from './FixedContent.js';
import './css/ContentHeader.css';

// export default function ContentHeader({ children }) {
// 	return (
// 		<header id='content-header'>
// 			{children}
// 		</header>
// 	);
// }

const contentHeader = forwardRef((props, ref) => {
	const { children } = props;

	return (
		<header id='content-header' ref={ref}>
			{children}
		</header>
	);
});

// export default function ContentHeader({ children }) {
// 	return (
// 		<FixedContent>
// 			<ContentHeaderInner children={children} />
// 		</FixedContent>
// 	);
// }

export default function ContentHeader({ children }) {
	return (
		<FixedContent childRenderer={contentHeader} children={children} />
	);
}