import { useState } from 'react';
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
	} catch (err) {
		console.log(err);
	}

	return null;
}

export async function loader() {
	const data = {
		posts: null
	};

	data.posts = await getPosts();
	return data;
}

export default function Home() {
	const data = useLoaderData();
	const isAuthorized = useOutletContext()[0];
	const [posts, setPosts] = useState(data.posts)

	async function getAndShowPosts() {
		setPosts(await getPosts());
	}

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