import React from 'react';
import axios from 'axios';
const util = require('./util.js');

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '',
            password: ''
        };
    }

    async onSubmit(event) {
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        try {
            const res = await axios.post(process.env.REACT_APP_REGISTER, user)
            console.log(util.prettyJSON(res));
        } catch (err) {
            console.error(err);
        }
        // .then(res => console.log(res.data));
        // console.log(util.prettyJSON(res));
    }

    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label htmlFor='username'>Username: </label>
                <input
                    id='username'
                    type='text'
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <label htmlFor='password'>Password: </label>
                <input
                    id='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onChangePassword}
                />
                <input
                    type='submit'
                    value='Register'
                />
                {/* <Link to={'register'}>Register</Link> */}
            </form>
        );
    }
}