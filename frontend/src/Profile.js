import { useLoaderData } from 'react-router-dom';
import ContentHeader from './ContentHeader.js';
import PostsList from './PostsList.js';

export default function Profile() {
	const data = useLoaderData();
	// const contentHeader = data.contentHeader;
	// const posts = data.posts;

	return (
		<>
			<ContentHeader contentHeader={data.contentHeader} />
			<PostsList posts={data.posts} />
		</>
	);
}