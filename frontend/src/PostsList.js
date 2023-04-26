import Post from './Post.js';
import './css/PostsList.css';

export default function PostsList({posts}) {
	function jsDate(pgDate){
		const pgDateTailRegex = /\.\w*/;
		return new Date(pgDate.replace(pgDateTailRegex, ''));
	}

	const formattedPosts = posts ? posts.map(post => ({
		id: post.id,
		poster: post.poster_username,
		timePosted: jsDate(post.time_posted),
		body: post.body,
		numReplies: post.num_replies
	})) : [];

	formattedPosts.sort((a, b) => {
		return b.timePosted - a.timePosted;
	});

	const renderPosts = formattedPosts.map(post =>
		<li key={post.id} className='post-li'>
			<Post
				id={post.id}
				poster={post.poster}
				timePosted={post.timePosted}
				body={post.body}
				numReplies={post.numReplies}
			/>
		</li>
	);

	return (	
		<ol className='posts-list'>
			{renderPosts}
		</ol>
	);
}