import { useState } from 'react';

export default function Post({text}) {
	// const [text, setText] = useState('');

	return (
		<div className='post'>
			{/* <p>{text}</p> */}
			{text}
		</div>
	);
}