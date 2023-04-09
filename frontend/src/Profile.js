import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import PostsList from './PostsList.js';

const util = require('@lenny_zhou/util');

export async function loader({ params }) {
	console.log('Profile.loader:');
	const data = {};
	data.contentHeader = params.username;

	try {
		const res = await axios.get(
			`${process.env.REACT_APP_PROFILE_POSTS}/${params.username}`
		);

		if (res.status === 200) {
			data.posts = res.data;
		}
	} catch (err) {
		console.log(err);
		data.posts = null;
	}

	return data;
}

export default function Profile() {
	const data = useLoaderData();
	util.log('test');

	async function handleFollow(event){
		console.log()
	}

	return (
		<>
			<div id='profile-header'>
				<ContentHeader contentHeader={data.contentHeader} />
				<input
					type='button'
					value='Follow'
					onClick={handleFollow}
				/>
			</div>
			<PostsList posts={data.posts} />
		</>
	);
}