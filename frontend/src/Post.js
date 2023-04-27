import { useState } from 'react';
import { Link } from 'react-router-dom';
import Editor from './Editor.js';
import PostsList from './PostsList.js';
import axios from 'axios';
import './css/Post.css';

const util = require('@lenny_zhou/util');

export default function Post({ id, poster, body, timePosted, initNumReplies }) {
	const [replies, setReplies] = useState([]);
	const [showRepliesMode, setShowRepliesMode] = useState(false);
	const [replyMode, setReplyMode] = useState(false);
	const [numReplies, setNumReplies] = useState(initNumReplies);

	async function getAndShowReplies() {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_REPLY_POSTS}/${id}`
			);

			if (res.status === 200) {
				setReplies(res.data);
				setNumReplies(replies.length);
				setShowRepliesMode(true);
			}
		} catch (err) {
			util.log(err);
		}
	}

	async function getAndShowRepliesAfterReply() {
		await getAndShowReplies();
		setReplyMode(false);
	}

	function hideReplies() {
		setShowRepliesMode(false);
	}

	async function toggleShowRepliesMode() {
		if (showRepliesMode === false) {
			getAndShowReplies();
		} else {
			hideReplies();
		}
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
					value={`${showRepliesMode ? 'Hide Replies' : 'Show Replies'} (${numReplies ? numReplies : 0})`}
					onClick={toggleShowRepliesMode}
				/>
				<input
					className='hoverable'
					type='button'
					value={replyMode ? 'Cancel' : 'Reply'}
					onClick={toggleReplyMode}
				/>
			</div>
			{replyMode && <Editor
				getAndShowPosts={getAndShowRepliesAfterReply}
				parentPostID={id}
			/>}
			{showRepliesMode && <div className='replies-div'>
				<div className='hide-replies-bar' onClick={hideReplies} />
				<PostsList posts={replies} />
			</div>}
		</div>
	);
}