import Post from './Post.js';

// const POST_COL = process.env.REACT_APP_POST_COL;
// const ID_COL = process.env.REACT_APP_ID_COL;
// const TIME_POSTED_COL = process.env.REACT_APP_TIME_POSTED_COL;

export default function PostsList({posts}) {
	const renderPosts = posts.map(post =>
		<li key={post.id} className='post-li'>
			<Post post={post.post} timePosted={post.time_posted} />
		</li>
	);

	return (
		<ol id='posts-list'>
			{renderPosts}
		</ol>
	);
}