export default function Post({ poster, post, timePosted }) {
	return (
		<div className='post'>
			{poster} {timePosted}
			<br />
			{post}
		</div>
	);
}