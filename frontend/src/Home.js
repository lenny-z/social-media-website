import { useState, useEffect } from 'react';
import axios from 'axios';
// import {useNavigate} from 'react-router-dom';
import Editor from './Editor.js';
import Post from './Post.js';

export default function Home() {
	const maxNumPosts = process.env.REACT_APP_INIT_MAX_NUM_POSTS;
	const [feed, setFeed] = useState([]);

	async function getFeed() {
		console.log('getFeed():');

		try {
			const res = await axios.get(process.env.REACT_APP_PROFILE_POSTS, { withCredentials: true });
			setFeed(res.data);
		} catch (err) {
			console.log(err);
		}
	}


	useEffect(() => {
		getFeed();
	}, []);

	const renderFeed = feed.map(post =>
		<li key={post.id}>
			<Post text={post.post} />
		</li>
	);

	console.log(renderFeed);

	return (
		<>
			<Editor />
			<ol>
				{renderFeed}
			</ol>
		</>
	);
}