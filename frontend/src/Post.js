export default function Post({ post, timePosted }) {
	return (
		<div className='post'>
			{timePosted}
			<br />
			{post}
		</div>
	);
}