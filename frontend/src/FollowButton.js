import {useState} from 'react';
import {useLoaderData} from 'react-router-dom';
import axios from 'axios';

// export default function FollowButton({onClick}){
export default function FollowButton({username}){
	// const [username, setUsername] = useState
	const [isHovered, setHovered] = useState(false);
	const data = useLoaderData();
	let buttonValue = '';

	if(data.isFollowing){
		if(isHovered){
			buttonValue = 'Unfollow';
		}else{
			buttonValue = 'Following';
		}
	}else{
		buttonValue = 'Follow';
	}

	async function setFollow(follow){
		const req = {
			username: username,
			follow: follow
		};

		const res = await axios.post(
			`${process.env.REACT_APP_FOLLOWS}`, req,
			{ withCredentials: true }
		);
	}

	function onMouseEnter(){
		setHovered(true);
	}

	function onMouseLeave(){
		setHovered(false);
	}

	return(
		<input
			type='button'
			id='follow-button'
			value={buttonValue}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={setFollow}
		/>
	);
}