import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

export async function getFollow(username) {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_FOLLOWS}/${username}`,
			{ withCredentials: true }
		);

		if (res.status === 200) {
			return res.data.isFollowing === true;
		}
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export default function FollowButton({ username }) {
	const data = useLoaderData();
	const [isFollowing, setFollowing] = useState(data.isFollowing === true);
	const [isHovered, setHovered] = useState(false);
	let buttonValue = '';

	if (isFollowing === true) {
		if (isHovered === true) {
			buttonValue = 'Unfollow';
		} else {
			buttonValue = 'Following';
		}
	} else {
		buttonValue = 'Follow';
	}

	async function follow() {
		const req = {
			username: username,
		};

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_FOLLOWS}`,
				req,
				{ withCredentials: true }
			);

			if (res.status === 201) { // 201 Created
				setFollowing(await getFollow(username));
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function unfollow() {
		try {
			const res = await axios.delete(
				`${process.env.REACT_APP_FOLLOWS}/${username}`,
				{ withCredentials: true }
			);

			if (res.status === 200) {
				setFollowing(await getFollow(username));
			}
		} catch (err) {
			console.error(err);
		}
	}

	function onMouseEnter() {
		setHovered(true);
	}

	function onMouseLeave() {
		setHovered(false);
	}

	return (
		<input
			type='button'
			id='follow-button'
			value={buttonValue}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={isFollowing ? unfollow : follow}
		/>
	);
}