import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import SearchResult from './SearchResult.js';

const util = require('@lenny_zhou/util');

async function getSearchResults(serializedParams) {
	// const serializedParams = new URLSearchParams([['terms', terms]])
		// .toString();

	// setSearchParams(serializedParams);

	try {
		const res = await axios.get(
			`${process.env.REACT_APP_SEARCH}?${serializedParams}`
		);

		if (res.status === 200) {
			// setSearchResults(res.data);
			return res.data;
		}
	} catch (err) {
		// if (err.response) {
			// console.log('Search.js: implement error handling');
		// }
		throw err;
	}
}

export async function loader() {
	const data = {};

	try {
		// const serializedParams = new URLSearchParams([['terms', terms]])
		// 	.toString();

		// // setSearchParams(serializedParams);

		// try {
		// 	const res = await axios.get(
		// 		`${process.env.REACT_APP_SEARCH}?${serializedParams}`
		// 	);

		// 	if (res.status === 200) {
		// 		setSearchResults(res.data);
		// 	}
		// } catch (err) {
		// 	if (err.response) {
		// 		console.log('Search.js: implement error handling');
		// 	}
		// }
	}catch(err){
		console.log(err);
	}
}

export default function Search() {
	const [terms, setTerms] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchResults, setSearchResults] = useState([]);

	// useEffect(() => {
	// 	const terms = searchParams.get('terms');
	// 	util.log(terms);
	// 	if(terms){
	// 		setTerms(searchParams.get('terms'));
	// 	}else{
	// 		setTerms('');
	// 	}
	// }, [searchParams])

	const renderResults = searchResults.map(searchResult =>
		<li key={searchResult.id}>
			<SearchResult username={searchResult.username} />
		</li>
	);

	async function handleSubmit(event) {
		event.preventDefault();
		util.log('Search.handleSubmit:');
		// const serializedParams = new URLSearchParams([['terms', terms]])
		// 	.toString();

		// setSearchParams(serializedParams);

		// try {
		// 	const res = await axios.get(
		// 		`${process.env.REACT_APP_SEARCH}?${serializedParams}`
		// 	);

		// 	if (res.status === 200) {
		// 		setSearchResults(res.data);
		// 	}
		// } catch (err) {
		// 	if (err.response) {
		// 		console.log('Search.js: implement error handling');
		// 	}
		// }
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