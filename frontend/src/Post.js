import { useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from './Editor.js';
import './css/Post.css';

export default function Post({ poster, body, timePosted }) {
	const [inReplyMode, setReplyMode] = useState(false);

	function toggleReplyMode() {
		setReplyMode(!inReplyMode);
	}

	return (
		<div className='post-div'>
			<Link className='username-link' to={`/${poster}`}>{poster}</Link>
			<div className='time-posted-div'>
				{timePosted.toDateString()}
			</div>
			<div className='body-div'>
				{body}
			</div>
			<div className='post-footer'>
				<input
					className='hoverable'
					type='button'
					value='Show Replies'
				/>
				<input
					className='reply-button hoverable'
					type='button'
					value={inReplyMode ? 'Cancel' : 'Reply'}
					onClick={toggleReplyMode}
				/>
			</div>
			{inReplyMode && <Editor />}
		</div>
	);
}