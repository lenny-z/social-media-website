import './css/Popup.css';

export default function Popup({ body, handleAcknowledge }) {
	return (
		<div className='popup'>
			<div className='popup-body'>
				{body}
			</div>
			<input
				type='button'
				value='OK'
				onClick={handleAcknowledge}
			/>
		</div>
	);
}