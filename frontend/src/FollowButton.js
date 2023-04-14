import {useState} from 'react';
import {useLoaderData, useParams} from 'react-router-dom';
import axios from 'axios';
import util from '@lenny_zhou/util';

export async function getFollow(username){
	// const params = useParams();
	try{
		const res = await axios.get(
			`${process.env.REACT_APP_FOLLOWS}/${username}`,
			{withCredentials: true}
		);

		if(res.status === 200){
			return res.data.isFollowing;
		}
	}catch(err){
		console.log(err);
	}
}

export default function FollowButton({username}){
	const data = useLoaderData();
	const params = useParams();
	const [isFollowing, setFollowing] = useState(data.isFollowing);
	const [isHovered, setHovered] = useState(false);
	let buttonValue = '';

	// if(data.isFollowing){
	if(isFollowing){
		if(isHovered){
			buttonValue = 'Unfollow';
		}else{
			buttonValue = 'Following';
		}
	}else{
		buttonValue = 'Follow';
	}

	async function makeFollow(){
		const req = {
			username: username,
			// follow: follow
		};

		try{
			const res = await axios.post(
				`${process.env.REACT_APP_FOLLOWS}`,
				req,
				{ withCredentials: true }
			);

			if(res.status === 201){ // 201 Created
				setFollowing(await getFollow(username));
			}
		}catch(err){
			util.log(err);
		}
	}

	async function deleteFollow(){
		// try{
			// const res = await axios.delete(

			// )
		// }
	}

	// async function getFollow(){
	// 	try{
	// 		const res = await axios.get(
	// 			`${process.env.REACT_APP_FOLLOWS}/${params.username}`,
	// 			{withCredentials: true}
	// 		);

	// 		if(res.status === 200){
	// 			return res.data.isFollowing;
	// 		}
	// 	}catch(err){
	// 		console.log(err);
	// 	}
	// }

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
			onClick={makeFollow}
		/>
	);
}