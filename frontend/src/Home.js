// import { useState, useEffect } from 'react';
import ContentHeader from './ContentHeader.js';
import PostsList from './PostsList.js';

export default function Home() {
	// const maxNumPosts = process.env.REACT_APP_INIT_MAX_NUM_POSTS;
	// const [posts, setPosts] = useState([]);

	return (
		<>
			<ContentHeader contentHeader='Home' />
			{/* <PostsList posts={posts} /> */}
		</>
	);
}