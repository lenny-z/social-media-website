import './css/Alert.css';

export default function Alert({ body }) {
	return (
		<div className='popup'>
			<div className='popup-body'>
				{body}
			</div>
			<input
				type='button'
				value='OK'
			/>
		</div>
	);
}