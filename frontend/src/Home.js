import { useState } from 'react';
import { useLoaderData, useRouteLoaderData, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import Editor from './Editor.js';
import ContentBody from './ContentBody.js';
import PostsList from './PostsList.js';

const util = require('@lenny_zhou/util');

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
		console.log(err);
		throw err;
	}
}

export async function loader() {
	const data = {};

	try {
		data.posts = await getPosts();
	} catch (err) {
		console.log(err);
	}

	return data;
}

export default function Home() {
	const data = useLoaderData();
	// const outletContext = useOutletContext();
	// util.log(outletContext);
	const [isAuthorized, setAuthorized, username] = useOutletContext();
	// const isAuthorized = useOutletContext()[0];
	const [posts, setPosts] = useState(data.posts)
	// const appData = useRouteLoaderData('app');

	async function getAndShowPosts() {
		setPosts(await getPosts());
	}

	return (
		<>
			<ContentHeader>Home</ContentHeader>
			{/* {appData.isAuthorized && <Editor
				getAndShowPosts={getAndShowPosts}
				parentPostID={null}
			/>} */}
			{isAuthorized && <Editor
				getAndShowPosts={getAndShowPosts}
				parentPostID={null}
			/>}
			<ContentBody>
				<PostsList posts={posts} />
			</ContentBody>
		</>
	);
}