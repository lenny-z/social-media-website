import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
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

export default function Home() {
	const isAuthorized = useOutletContext()[0];
	const [posts, setPosts] = useState([]);

	async function getAndShowPosts() {
		if (isAuthorized === true) {
			setPosts(await getFeedPosts());
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