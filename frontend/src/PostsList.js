import Post from './Post.js';
import db from './db.js';

// const POST_COL = process.env.REACT_APP_POST_COL;
// const ID_COL = process.env.REACT_APP_ID_COL;
// const TIME_POSTED_COL = process.env.REACT_APP_TIME_POSTED_COL;

export default function PostsList({posts}) {
	const renderPosts = posts.map(post =>
		<li key={post[db.ID_COL]} className='post-li'>
			<Post post={post[db.POST_COL]} timePosted={post[db.TIME_POSTED_COL]} />
		</li>
	);

	return (
		<ol id="posts-list">
			{renderPosts}
		</ol>
	);
}