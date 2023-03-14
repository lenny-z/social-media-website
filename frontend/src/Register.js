// import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const util = require('./util.js');
// const navigate = useNavigate();

// function goHome(){
//     const navigate = useNavigate();
//     navigate('/home');
// }

// export default class Register extends React.Component {
export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // constructor(props) {
    //     super(props);

    //     this.onSubmit = this.onSubmit.bind(this);
    //     this.onChangeUsername = this.onChangeUsername.bind(this);
    //     this.onChangePassword = this.onChangePassword.bind(this);

    //     this.state = {
    //         username: '',
    //         password: ''
    //     };
    // }

    // async onSubmit(event) {
    async function handleSubmit(event){
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        try {
            const res = await axios.post(process.env.REACT_APP_REGISTER, user);

            if (res.status === 201) {
                // const navigate = useNavigate();
                navigate('/home');
                // goHome();
                // useNavigate('/home');
            }
            // console.log(util.prettyJSON(res));
        } catch (err) {
            // console.error(util.prettyJSON(err));
            // console.error(err);
        }
    }

    // function onChangeUsername(event) {
    //     this.setState({
    //         username: event.target.value
    //     });
    // }
    function handleUsername(event){
        setUsername(event.target.value);
    }

    // function onChangePassword(event) {
    //     this.setState({
    //         password: event.target.value
    //     });
    // }
    function handlePassword(event){
        setPassword(event.target.value);
    }

    // render() {
        return (
            // <form onSubmit={this.onSubmit}>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input
                    id='username'
                    type='text'
                    // value={this.state.username}
                    value={username}
                    // onChange={this.onChangeUsername}
                    onChange={handleUsername}
                />
                <label htmlFor='password'>Password: </label>
                <input
                    id='password'
                    type='password'
                    // value={this.state.password}
                    value={password}
                    // onChange={this.onChangePassword}
                    onChange={handlePassword}
                />
                <input
                    type='submit'
                    value='Register'
                />
                {/* <Link to={'register'}>Register</Link> */}
            </form>
        );
    // }
}