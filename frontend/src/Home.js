import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentPanel from './ContentPanel.js';
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
		console.log(err);
	}

	return data;
}

export default function Home() {
	const data = useLoaderData();

	// return (
	// 	<>
	// 		<ContentPanel>
	// 			<ContentHeader>Home</ContentHeader>
	// 			<PostsList posts={data.posts} />
	// 		</ContentPanel>
	// 	</>
	// );
	return (
		<ContentPanel
			header='Home'
			body={<PostsList posts={data.posts} />}
		/>
	);
}