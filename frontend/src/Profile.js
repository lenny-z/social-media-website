import { useLoaderData, useParams } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import PostsList from './PostsList.js';
import FollowButton from './FollowButton.js';
import './css/Profile.css';

const util = require('@lenny_zhou/util');

const USERNAME_COL = process.env.REACT_APP_USERNAME_COL;

export async function loader({ params }) {
	util.log('Profile.loader:');
	const data = {};

	try {
		var res = await axios.get(
			`${process.env.REACT_APP_PROFILE_POSTS}/${params[USERNAME_COL]}`
		);

		if (res.status === 200) {
			data.posts = res.data;
		}

		res = await axios.get(
			`${process.env.REACT_APP_FOLLOWS}/${params[USERNAME_COL]}`,
			{withCredentials: true}
		);

		if(res.status === 200){
			data.isFollowing = res.data.isFollowing;
		}
	} catch (err) {
		console.log(err);
	}

	return data;
}

export default function Profile() {
	const params = useParams();
	const data = useLoaderData();

	async function handleFollow() {
		const req = {};
		req[USERNAME_COL] = params[USERNAME_COL];

		const res = await axios.post(
			`${process.env.REACT_APP_FOLLOWS}`,
			req,
			{ withCredentials: true }
		);
	}

	return (
		<>
			<div id='profile-header'>
				<ContentHeader contentHeader={params[USERNAME_COL]} />
				<FollowButton onClick={handleFollow} />
			</div>
			<PostsList posts={data.posts} />
		</>
	);
}