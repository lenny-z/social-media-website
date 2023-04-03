import { Link } from 'react-router-dom';

export default function SearchResult({ username }) {
	return (
		<Link className='search-result' to={`/${username}`}>{username}</Link>
	);
}