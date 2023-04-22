import { useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from './Editor.js';
import Replies from './Replies.js';
import './css/Post.css';

export default function Post({ id, poster, body, timePosted }) {
	const [showRepliesMode, setShowRepliesMode] = useState(false);
	const [replyMode, setReplyMode] = useState(false);

	function toggleShowRepliesMode() {
		setShowRepliesMode(!showRepliesMode);
	}

	function toggleReplyMode() {
		setReplyMode(!replyMode);
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
					value={showRepliesMode ? 'Hide Replies' : 'Show Replies'}
					onClick={toggleShowRepliesMode}
				/>
				<input
					className='hoverable'
					type='button'
					value={replyMode ? 'Cancel' : 'Reply'}
					onClick={toggleReplyMode}
				/>
			</div>
			{replyMode && <Editor parentPostID={id}/>}
			{showRepliesMode && <Replies parentID={id} />}
		</div>
	);
}