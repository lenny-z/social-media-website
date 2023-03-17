// import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default class Login extends React.Component {
//     constructor(props) {
//         super(props);

//         this.onSubmit = this.onSubmit.bind(this);
//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangePassword = this.onChangePassword.bind(this);

//         this.state = {
//             username: '',
//             password: ''
//         };
//     }

//     onSubmit(event) {
//         event.preventDefault();

//         const user = {
//             username: this.state.username,
//             password: this.state.password
//         };

//         axios.post(process.env.REACT_APP_LOGIN, user)
//             .then(res => console.log(res.data));
//     }

//     onChangeUsername(event) {
//         this.setState({
//             username: event.target.value
//         });
//     }

//     onChangePassword(event) {
//         this.setState({
//             password: event.target.value
//         });
//     }

//     render() {
//         return (
//             <form onSubmit={this.onSubmit}>
//                 <label htmlFor='username'>Username: </label>
//                 <input
//                     id='username'
//                     type='text'
//                     value={this.state.username}
//                     onChange={this.onChangeUsername}
//                 />
//                 <label htmlFor='password'>Password: </label>
//                 <input
//                     id='password'
//                     type='password'
//                     value={this.state.password}
//                     onChange={this.onChangePassword}
//                 />
//                 <input
//                     type='submit'
//                     value='Log In'
//                 />
//                 <Link to={'register'}>Register</Link>
//             </form>
//         );
//     }
// }

import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// const util = require('./util.js');

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const user = {
            username: username,
            password: password
        };

        const res = await axios.post(process.env.REACT_APP_LOGIN, user);
        console.log(res.data);

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
                value='Log In'
            />
            <Link to={'register'}>Register</Link>
        </form>
    );
}