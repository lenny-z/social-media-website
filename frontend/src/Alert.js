import './css/Alert.css';

export default function Alert({ body }) {
	return (
		<div className='alert'>
			<div className='alert-body'>
				{body}
			</div>
			<input
				type='button'
				value='OK'
			/>
		</div>
	);
}