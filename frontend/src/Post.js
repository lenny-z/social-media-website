import { Link } from 'react-router-dom';
import './css/Post.css';

export default function Post({ poster, body, timePosted }) {
	return (
		<div className='post-div'>
			<Link className='username-link'>{poster}</Link>
			<div className='time-posted-div'>
				{timePosted}
			</div>
			<div className='body-div'>
				{body}
			</div>
		</div>
	);
}