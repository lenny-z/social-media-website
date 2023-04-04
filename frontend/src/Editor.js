import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Editor({ getPosts }) {
	const [post, setPost] = useState('');
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();

		const req = {
			post: post
		};

		try {
			const res = await axios.post(process.env.REACT_APP_POSTS, req,
				{ withCredentials: true });

			if (res.status === 201) {
				getPosts();
			}
		} catch (err) {
			console.log(err);
			if (err.response && err.response.status === 401) {
				navigate('/');
			}
		}
	}

	function handleText(event) {
		setPost(event.target.value);
	}

	return (
		<form
			id='post-form'
			onSubmit={handleSubmit}
		>
			<textarea
				id='post-input'
				value={post}
				onChange={handleText}
			/>
			<input
				type='submit'
				value='Post'
			/>
		</form>
	);
}