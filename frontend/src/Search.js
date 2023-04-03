import { useState } from 'react';
import axios from 'axios';

export default function Search() {
	const [terms, setTerms] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();
		console.log('Search.handleSubmit:');

		const terms = {
			terms: terms
		};

		try {
			const res = await axios.post(process.env.REACT_APP_SEARCH, terms,
				{ withCredentials: true });
		} catch (err) {
			if (err.response) {
				console.log('Search.js: implement error handling');
			}
		}
	}

	function handleTerms(event) {
		setTerms(event.target.value);
	}

	return (
		<form id='search-form' onSubmit={handleSubmit}>
			<input
				id='search-input'
				type='text'
				value={terms}
				onChange={handleTerms}
			/>
			<input
				type='submit'
				value='Search'
			/>
		</form>
	);
}