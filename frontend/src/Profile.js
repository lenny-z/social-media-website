import { useLoaderData, useParams } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import PostsList from './PostsList.js';
import FollowButton, {getFollow} from './FollowButton.js';
import './css/Profile.css';

const util = require('@lenny_zhou/util');

export async function loader({ params }) {
	util.log('Profile.loader:');
	const data = {};

	try {
		var res = await axios.get(
			`${process.env.REACT_APP_PROFILE_POSTS}/${params.username}`
		);

		if (res.status === 200) {
			data.posts = res.data;
		}

		data.isFollowing = getFollow(params.username);

		// data.isFollowing = FollowButton.getFollow();

		// res = await axios.get(
		// 	`${process.env.REACT_APP_FOLLOWS}/${params.username}`,
		// 	{ withCredentials: true }
		// );

		// if (res.status === 200) {
		// 	data.isFollowing = res.data.isFollowing;
		// }
	} catch (err) {
		console.log(err);
	}

	return data;
}

export default function Profile() {
	const params = useParams();
	const data = useLoaderData();

	return (
		<>
			<div id='profile-header'>
				<ContentHeader contentHeader={params.username} />
				<FollowButton username={params.username} />
			</div>
			<PostsList posts={data.posts} />
		</>
	);
}