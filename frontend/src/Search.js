import { useState } from 'react';
import {useSearchParams} from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import SearchResult from './SearchResult.js';

const util = require('@lenny_zhou/util');

export default function Search() {
	// let [searchParams, setSearchParams] = useSearchParams();
	// util.log('Search:');
	// util.log(searchParams, 4);

	const [terms, setTerms] = useState('');
	// const [terms, setTerms] = useSearchParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchResults, setSearchResults] = useState([]);

	const renderResults = searchResults.map(searchResult =>
		<li key={searchResult.id}>
			<SearchResult username={searchResult.username} />
		</li>
	);

	async function handleSubmit(event) {
		event.preventDefault();
		util.log('Search.handleSubmit:');
		const serializedParams = new URLSearchParams([['terms', terms]]).toString();
		// serializedParams.append('terms', terms);
		setSearchParams(serializedParams);

		// const req = {
			// params: {
			// 	terms: terms
			// }
		// };

		try {
			// const res = await axios.post(process.env.REACT_APP_SEARCH, req,
			// { withCredentials: true });
			const res = await axios.get(
				// process.env.REACT_APP_SEARCH,
				// serializer.toString()
				`${process.env.REACT_APP_SEARCH}?${serializedParams}`
			);

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