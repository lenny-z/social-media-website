import { useState } from 'react';

export default function Post({post}) {
	return (
		<div className='post'>
			{post}
		</div>
	);
}