import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Editor from './Editor.js';
import PostsList from './PostsList.js';

export default function Home() {
	const maxNumPosts = process.env.REACT_APP_INIT_MAX_NUM_POSTS;
	const [posts, setPosts] = useState([]);

	async function getPosts() {
		console.log('getPosts():');

		try {
			const res = await axios.get(
				process.env.REACT_APP_PROFILE_POSTS,
				{ withCredentials: true }
			);

			if (res.status === 200) {
				console.log(`\tres.data: ${JSON.stringify(res.data)}`);
				setPosts(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div id='app-container'>
			<nav id='nav-panel'>
				<ol>
					<li><Link to={'home'}>Home</Link></li>
					<li>Profile</li>
					<li>Collections</li>
					<li>Search</li>
					<li>Notifications</li>
					<li>Messages</li>
				</ol>
			</nav>
			<div id='content-panel'>
				<Editor getPosts={getPosts} />
				<PostsList posts={posts} />
			</div>
		</div>
	);
}