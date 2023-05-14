import './css/Alert.css';

export default function Alert({ id, body, deleteThis }) {
	return (
		<div className='alert'>
			<div className='alert-body'>
				{id}
				{/* {body} */}
			</div>
			<input
				type='button'
				value='OK'
				onClick={deleteThis}
			/>
		</div>
	);
}