import {useState} from 'react';
import {useLoaderData} from 'react-router-dom';
import axios from 'axios';

const USERNAME_COL = process.env.REACT_APP_USERNAME_COL;

export default function FollowButton({onClick}){
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

	function onMouseEnter(){
		setHovered(true);
	}

	function onMouseLeave(){
		setHovered(false);
	}

	// async function handleFollow() {
	// 	const req = {};
	// 	req[USERNAME_COL] = params[USERNAME_COL];
	// 	util.log(`Profile.req: ${util.prettyJSON(req)}`, 4);

	// 	const res = await axios.post(
	// 		`${process.env.REACT_APP_FOLLOWS}`,
	// 		req,
	// 		{ withCredentials: true }
	// 	);
	// }

	return(
		<input
			type='button'
			id='follow-button'
			value={buttonValue}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClick}
		/>
	);
}