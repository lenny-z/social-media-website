import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const util = require('./util.js');

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const user = {
            username: username,
            password: password
        };

        const res = await axios.post(process.env.REACT_APP_REGISTER, user);

        if (res.status === 201) {
            navigate('/home');
        }
    }

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username: </label>
            <input
                id='username'
                type='text'
                value={username}
                onChange={handleUsername}
            />
            <label htmlFor='password'>Password: </label>
            <input
                id='password'
                type='password'
                value={password}
                onChange={handlePassword}
            />
            <input
                type='submit'
                value='Register'
            />
        </form>
    );
}