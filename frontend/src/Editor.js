import { useState } from 'react';
import axios from 'axios';
import './css/Editor.css';

export default function Editor({ getAndShowPosts, parentPostID }) {
	const [body, setBody] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const req = {
			parentID: parentPostID,
			body: body
		};

		try {
			const res = await axios.post(
				process.env.REACT_APP_POSTS,
				req,
				{ withCredentials: true }
			);

			if (res.status === 201) {
				setBody('');
				getAndShowPosts();
			}
		} catch (err) {
			console.log(err);
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