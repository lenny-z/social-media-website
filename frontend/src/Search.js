import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ContentHeader from './ContentHeader.js';
import ContentBody from './ContentBody.js';
import SearchResult from './SearchResult.js';
import './css/Search.css';

const util = require('@lenny_zhou/util');

export default function Search() {
	const location = useLocation();
	const [terms, setTerms] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchResults, setSearchResults] = useState([]);

	const renderResults = searchResults.map(searchResult =>
		<li key={searchResult.id}>
			<SearchResult username={searchResult.username} />
		</li>
	);

	async function getSearchResults() {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_SEARCH}?${searchParams.toString()}`
			);

			if (res.status === 200) {
				setSearchResults(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		const newTerms = searchParams.get('terms');

		setTerms(newTerms ? newTerms : '');
		getSearchResults();
	}, [location]);

	async function handleSubmit(event) {
		event.preventDefault();
		util.log('Search.handleSubmit:');

		const serializedParams = new URLSearchParams([['terms', terms]])
			.toString();

		setSearchParams(serializedParams);
		getSearchResults();
	}

	function handleTerms(event) {
		setTerms(event.target.value);
	}

	return (
		<>
			<ContentHeader>Search</ContentHeader>
			<ContentBody>
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
			</ContentBody>
		</>
	);
}