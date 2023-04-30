import { useState, useEffect } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import Editor from './Editor.js';
import ContentBody from './ContentBody.js';
import PostsList from './PostsList.js';

async function getPosts() {
	try {
		const res = await axios.get(
			process.env.REACT_APP_FEED_POSTS,
			{ withCredentials: true }
		);

		if (res.status === 200) {
			return res.data;
		}

		return null;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

async function getAllPosts() {
	try {
		const res = await axios.get(
			process.env.REACT_APP_ALL_POSTS
		);

		if (res.status === 200) {
			return res.data;
		}

		return null;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

// export async function loader() {
// 	const data = {
// 		posts: null
// 	};

// 	// try {
// 	data.posts = await getPosts();
// 	// } catch (err) {
// 	// data.posts = null;
// 	// }

// 	return data;
// }

export default function Home() {
	// const data = useLoaderData();
	const isAuthorized = useOutletContext()[0];
	// const [posts, setPosts] = useState(data.posts)
	const [posts, setPosts] = useState([]);

	async function getAndShowPosts() {
		if (isAuthorized === true) {
			setPosts(await getPosts());
		} else {
			setPosts(await getAllPosts());
		}
	}

	useEffect(() => {
		getAndShowPosts();
	})


	return (
		<>
			<ContentHeader>Home</ContentHeader>
			{isAuthorized && <Editor
				getAndShowPosts={getAndShowPosts}
				parentPostID={null}
			/>}
			<ContentBody>
				{posts && <PostsList posts={posts} />}
			</ContentBody>
		</>
	);
}