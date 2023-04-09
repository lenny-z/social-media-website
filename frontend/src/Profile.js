// import { useState, useEffect } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
// import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import PostsList from './PostsList.js';

export default function Profile() {
	// console.log(useLoaderData());
	const data = useLoaderData();
	const contentHeader = data.contentHeader;
	const posts = data.posts;

	// const posts = useLoaderData().posts;

	return (
		<>
			<ContentHeader contentHeader={contentHeader} />
			<PostsList posts={posts} />
		</>
	);
}