import { Link } from 'react-router-dom';
import './css/Post.css';

export default function Post({ poster, post, timePosted }) {
	return (
		<div className='post'>
			<Link className='username-link'>{poster}</Link>
			{/* <br /> */}
			<div className='time-posted-div'>
				{timePosted}
			</div>
			{/* <br /> */}
			<div className='post-div'>
				{post}
			</div>
		</div>
	);
}