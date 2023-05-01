import { useLoaderData, useParams, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
import PostsList from './PostsList.js';
import FollowButton, { getFollow } from './FollowButton.js';
import './css/Profile.css';

const util = require('@lenny_zhou/util');

export async function loader({ params }) {
	const data = {
		posts: null,
		isFollowing: null
	};

	try {
		const res = await axios.get(
			`${process.env.REACT_APP_PROFILE_POSTS}/${params.username}`
		);

		if (res.status === 200) {
			data.posts = res.data;
		}

		data.isFollowing = await getFollow(params.username);
	} catch (err) {
		console.error(err);
	}

	return data;
}

export default function Profile({ isAuthorized, username }) {
	const params = useParams();
	const data = useLoaderData();
	// const isAuthorized = useOutletContext()[0];
	// const username = useOutletContext()[2];

	return (
		<>
			<ContentHeader>
				<div id='profile-header'>
					<div id='profile-header-username'>
						{params.username}
					</div>
					{isAuthorized === true
						&& username !== params.username
						&& <FollowButton username={params.username} />
					}
				</div>
			</ContentHeader>
			<ContentBody>
				<PostsList posts={data.posts} isAuthorized={isAuthorized} />
			</ContentBody>
		</>
	);
}