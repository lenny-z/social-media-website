import { useState } from 'react';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import SearchResult from './SearchResult.js';

const ID_COL = process.env.REACT_APP_ID_COL;
const USERNAME_COL = process.env.REACT_APP_USERNAME_COL;

export default function Search() {
	const [terms, setTerms] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const renderResults = searchResults.map(searchResult =>
		<li key={searchResult[ID_COL]}>
			<SearchResult username={searchResult[USERNAME_COL]} />
		</li>
	);

	async function handleSubmit(event) {
		event.preventDefault();
		console.log('Search.handleSubmit:');

		const req = {
			terms: terms
		};

		try {
			const res = await axios.post(process.env.REACT_APP_SEARCH, req,
				{ withCredentials: true });

			if (res.status === 200) {
				setSearchResults(res.data);
			}
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
		<>
			<ContentHeader contentHeader='Search' />
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
			<ol id='search-results'>
				{renderResults}
			</ol>
		</>
	);
}