import Post from './Post.js';
import './css/PostsList.css';

export default function PostsList({posts}) {
	const renderPosts = posts.map(post =>
		<li key={post.id} className='post-li'>
			<Post poster={post.username} timePosted={post.time_posted} body={post.body} />
		</li>
	);

	return (
		<ol id='posts-list'>
			{renderPosts}
		</ol>
	);
}