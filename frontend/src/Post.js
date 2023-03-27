import {useState} from 'react';

export default function Post(){
	const [text, setText] = useState('');

	return(
		<div className='post'>
			{text}
		</div>
	);
}