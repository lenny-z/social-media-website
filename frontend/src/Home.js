// import { useState, useEffect } from 'react';
import {useLoaderData} from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import PostsList from './PostsList.js';

const util = require('@lenny_zhou/util');

export async function loader() {
	util.log('Home.loader:');
	const data = {};

	try {
		var res = await axios.get(
			process.env.REACT_APP_FEED_POSTS,
			{ withCredentials: true }
		);

		data.posts = res.data;
	} catch (err) {
		util.log(err);
	}

	return data;
}

export default function Home() {
	const data = useLoaderData();
	// const maxNumPosts = process.env.REACT_APP_INIT_MAX_NUM_POSTS;
	// const [posts, setPosts] = useState([]);

	return (
		<>
			<ContentHeader contentHeader='Home' />
			<PostsList posts={data.posts} />
		</>
	);
}