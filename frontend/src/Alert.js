import { useState } from 'react';
import './css/Alert.css';

export default function Alert({ body }) {
	// function handleOK() {
	// 	setActive(false);
	// }
	// console.log(trigger);

	return (
		// <>
		// 	{trigger === true && <>
		// 		<div className='popup'>
		// 			<div className='popup-body'>
		// 				{body}
		// 			</div>
		// 			<input
		// 				type='button'
		// 				value='OK'
		// 				onClick={setTrigger(false)}
		// 			/>
		// 		</div>
		// 	</>}
		// </>
		<div className='popup'>
			<div className='popup-body'>
				{body}
			</div>
			<input
				type='button'
				value='OK'
			// onClick={setTrigger(false)}
			/>
		</div>
	);
}