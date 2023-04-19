import { useRef } from 'react';

const util = require('@lenny_zhou/util');

export default function FixedContent({ childRenderer }) {
	const heightRef = useRef(null);
	const Child = childRenderer(heightRef);

	return (
		<>
			<div
				className='absolute-content-padding'

			// style={{
			// 	height: heightRef.current.clientHeight
			// }}
			/>
			<Child />
		</>
	);
}