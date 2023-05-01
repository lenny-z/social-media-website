import { useState } from 'react';
import { useOutletContext, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import Editor from './Editor.js';
import ContentBody from './ContentBody.js';
import PostsList from './PostsList.js';

async function getFeedPosts() {
	try {
		const res = await axios.get(
			process.env.REACT_APP_FEED_POSTS,
			{ withCredentials: true }
		);

		if (res.status === 200) {
			return res.data;
		}

		throw new Error('NOT 200');
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

		throw new Error('NOT 200');
	} catch (err) {
		console.error(err);
		throw err;
	}
}

export async function loader(isAuthorized) {
	if (isAuthorized === true) {
		return async () => {
			try {
				const posts = await getFeedPosts();

				const data = {
					// posts: await getFeedPosts()
					posts: posts
				}

				return data;
			} catch (err) {
				throw err;
			}
		}
	} else {
		return async () => {
			try {
				const posts = await getAllPosts();
				
				const data = {
					// posts: await getAllPosts()
					posts: posts
				}

				return data;
			} catch (err) {
				throw err;
			}
		}
	}
}

export default function Home() {
	const isAuthorized = useOutletContext()[0];
	console.log('isAuthorized: ' + isAuthorized);
	// const [posts, setPosts] = useState(null);
	const [posts, setPosts] = useLoaderData().posts;

	async function getAndShowPosts() {
		try {
			if (isAuthorized === true) {
				setPosts(await getFeedPosts());
			} else {
				setPosts(await getAllPosts());
			}
		} catch (err) {
			setPosts(null);
		}
	}

	// useEffect(() => { // Move this functionality to loader
	// 	getAndShowPosts();
	// });


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