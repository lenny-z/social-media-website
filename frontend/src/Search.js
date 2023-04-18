import { useState } from 'react';
import { useSearchParams, useLoaderData } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import SearchResult from './SearchResult.js';

const util = require('@lenny_zhou/util');

async function getSearchResults(serializedParams) {
	try {
		const res = await axios.get(
			`${process.env.REACT_APP_SEARCH}?${serializedParams}`
		);

		if (res.status === 200) {
			return res.data;
		}
	} catch (err) {
		throw err;
	}
}

export async function loader() {
	util.log('Search.loader:');
	const data = {};
	const params = new URL(document.location).searchParams;

	try {
		data.searchResults = await getSearchResults(params.toString());
	} catch (err) {
		console.log(err);
	}

	return data;
}

export default function Search() {
	const data = useLoaderData();
	const [terms, setTerms] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchResults, setSearchResults] = useState(data.searchResults);

	const renderResults = searchResults.map(searchResult =>
		<li key={searchResult.id}>
			<SearchResult username={searchResult.username} />
		</li>
	);

	async function handleSubmit(event) {
		event.preventDefault();
		util.log('Search.handleSubmit:');

		const serializedParams = new URLSearchParams([['terms', terms]])
			.toString();

		setSearchParams(serializedParams);
		setSearchResults(await getSearchResults(serializedParams));
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