import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import * as validator from '@lenny_zhou/validator';
import Validations from './Validations.js';
import './css/Editor.css';

export default function Editor({ getAndShowPosts, parentPostID }) {
	const [body, setBody] = useState('');
	const pushAlert = useOutletContext()[0];

	async function handleSubmit(event) {
		event.preventDefault();
		const validation = await validator.post(body);

		if (!validator.allReqsMet(validation)) {
			const alertBody = <>
				<p>Post:</p>
				<Validations reqsNotMet={validator.reqsNotMet(validation)} />
			</>;

			pushAlert(alertBody);
			return;
		}

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
				className='hoverable'
				type='submit'
				value='Post'
			/>
		</form>
	);
}