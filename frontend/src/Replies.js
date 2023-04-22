import { useState, useEffect } from 'react';
import axios from 'axios';
import PostsList from './PostsList.js';

const util = require('@lenny_zhou/util');

export default function Replies({ parentID }) {
	const [replies, setReplies] = useState([]);

	async function getReplies() {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_REPLY_POSTS}/${parentID}`
			);
			// util.log(res);

			if (res.status === 200) {
				setReplies(res.data);
			}
		} catch (err) {
			util.log(err);
		}
	}

	useEffect(() => {
		getReplies()
	}, []);

	return (
		<PostsList posts={replies} />
	);
}