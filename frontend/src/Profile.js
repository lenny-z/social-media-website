import { useState, useEffect } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import PostsList from './PostsList.js';

export default function Profile() {
	// const { username } = useParams();
	// const [posts, setPosts] = useState([]);

	// async function getPosts() {
	// 	console.log('Profile.getPosts:');

	// 	try {
	// 		const res = await axios.get(
	// 			process.env.REACT_APP_PROFILE_POSTS,
	// 			{ withCredentials: true }
	// 		);

	// 		if (res.status === 200) {
	// 			setPosts(res.data);
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }
	const posts = useLoaderData();
	console.log(posts);

	// useEffect(() => {
	// 	// getPosts();
	// }, []);

	return (
		<PostsList posts={posts} />
	);
}