import { useLoaderData, useParams } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import PostsList from './PostsList.js';
import './css/Profile.css';

const util = require('@lenny_zhou/util');

const USERNAME_COL = process.env.REACT_APP_USERNAME_COL;

export async function loader({ params }) {
	util.log('Profile.loader:');
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
	const params = useParams();
	const data = useLoaderData();

	async function handleFollow(event) {
		const req = {};
		req[USERNAME_COL] = params[USERNAME_COL];
		util.log(`Profile.req: ${util.prettyJSON(req)}`, 4);

		const res = await axios.post(
			`${process.env.REACT_APP_FOLLOWS}`,
			req,
			{ withCredentials: true }
		);
	}

	return (
		<>
			<div id='profile-header'>
				{/* <ContentHeader contentHeader={data.contentHeader} /> */}
				<ContentHeader contentHeader={params[USERNAME_COL]} />
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