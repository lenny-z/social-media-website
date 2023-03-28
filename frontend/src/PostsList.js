// import { useState, useEffect } from 'react';
// import axios from 'axios';
import Post from './Post.js';

export default function PostsList({posts}) {
	const maxNumPosts = process.env.REACT_APP_INIT_MAX_NUM_POSTS;
	// const [posts, setPosts] = useState([]);

	// async function getPosts() {
	// 	console.log('getPosts():');

	// 	try {
	// 		const res = await axios.get(
	// 			process.env.REACT_APP_PROFILE_POSTS,
	// 			{ withCredentials: true }
	// 		);

	// 		setPosts(res.data);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	// useEffect(() => {
	// 	getPosts();
	// }, []);

	const renderPosts = posts.map(post =>
		<li key={post.id}>
			<Post post={post.post} />
		</li>
	);

	return (
		<ol id="posts-list">
			{renderPosts}
		</ol>
	);
}