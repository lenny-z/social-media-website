import { Link } from 'react-router-dom';
import './css/Post.css';

export default function Post({ poster, body, timePosted }) {
	return (
		<div className='post-div'>
			<Link className='username-link' to={`/${poster}`}>{poster}</Link>
			<div className='time-posted-div'>
				{timePosted.toDateString()}
			</div>
			<div className='body-div'>
				{body}
			</div>
		</div>
	);
}