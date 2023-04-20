import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Editor.css';

export default function Editor({ getPosts }) {
	const [body, setBody] = useState('');
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();

		const req = {
			body: body
		};

		try {
			const res = await axios.post(
				process.env.REACT_APP_POSTS,
				req,
				{ withCredentials: true }
			);

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
		setBody(event.target.value);
	}

	return (
		<form
			id='post-form'
			onSubmit={handleSubmit}
		>
			<textarea
				id='post-input'
				value={body}
				onChange={handleText}
			/>
			<input
				type='submit'
				value='Post'
			/>
		</form>
	);
}