import { useRef } from 'react';

const util = require('@lenny_zhou/util');

export default function FixedContent({ child, renderChild }) {
	const heightRef = useRef(null);

	return (
		<>
			<div
				className='absolute-content-padding'

			// style={{
			// 	height: heightRef.current.clientHeight
			// }}
			/>
			{renderChild(child, heightRef)}
		</>
	);
}