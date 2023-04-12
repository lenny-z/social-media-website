import {useState} from 'react';
import {useLoaderData} from 'react-router-dom';

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