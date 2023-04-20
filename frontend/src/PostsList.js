import Post from './Post.js';
import './css/PostsList.css';

export default function PostsList({posts}) {
	function jsDate(pgDate){
		const tailRegex = /\.\w*/;
		return new Date(pgDate.replace(tailRegex, ''));
	}

	const formattedPosts = posts ? posts.map(post => ({
		id: post.id,
		poster: post.username,
		timePosted: jsDate(post.time_posted),
		body: post.body
	})) : [];

	formattedPosts.sort((a, b) => {
		return b.timePosted - a.timePosted;
	});

	const renderPosts = formattedPosts.map(post =>
		<li key={post.id} className='post-li'>
			<Post
				poster={post.poster}
				timePosted={post.timePosted}
				body={post.body}
			/>
		</li>
	);

	return (
		<ol id='posts-list'>
			{renderPosts}
		</ol>
	);
}