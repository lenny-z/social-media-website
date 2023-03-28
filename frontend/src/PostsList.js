import Post from './Post.js';

export default function PostsList({posts}) {
	const renderPosts = posts.map(post =>
		<li key={post.id}>
			<Post post={post.post} />
		</li>
	);

	return (
		<ol id="posts-list">
			{renderPosts}
		</ol>
	);
}