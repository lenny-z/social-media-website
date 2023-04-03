import { useState } from 'react';
import axios from 'axios';
import SearchResult from './SearchResult.js';

const ID_COL = process.env.ID_COL;
const USERNAME_COL = process.env.USERNAME_COL;

export default function Search() {
	const [terms, setTerms] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	// var renderResults;

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
				console.log(`\tres.data: ${JSON.stringify(res.data)}`);
				setSearchResults(res.data);

				// renderResults = searchResults.map(searchResult =>
				// 	<li key={searchResult[ID_COL]}>
				// 		<SearchResult username={searchResult[USERNAME_COL]} />
				// 	</li>
				// );
				// console.log(searchResults);
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

	const renderResults = searchResults.map(searchResult =>
		<li key={searchResult[ID_COL]}>
			<SearchResult username={searchResult[USERNAME_COL]} />
		</li>
	);
	// console.log(renderResults);

	return (
		<>
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