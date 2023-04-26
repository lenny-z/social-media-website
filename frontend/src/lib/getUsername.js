import axios from 'axios';

export default async function getUsername() {
	try {
		const res = await axios.get(
			process.env.REACT_APP_AUTHORIZE,
			{ withCredentials: true }
		);

		if (res.status === 200) {
			return res.data.username;
		}
	} catch (err) {
		console.log(err);
		return null;
	}

	return null;
}