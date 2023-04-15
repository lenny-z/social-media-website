import { useLoaderData, useParams } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import PostsList from './PostsList.js';
import FollowButton, {getFollow} from './FollowButton.js';
import './css/Profile.css';

const util = require('@lenny_zhou/util');

export async function loader({ params }) {
	const data = {};

	try {
		var res = await axios.get(
			`${process.env.REACT_APP_PROFILE_POSTS}/${params.username}`
		);

		if (res.status === 200) {
			data.posts = res.data;
		}

		data.isFollowing = await getFollow(params.username);
	} catch (err) {
		util.log(err);
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