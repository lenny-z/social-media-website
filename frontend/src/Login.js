import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
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

    onSubmit(event){
        event.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post(process.env.REACT_APP_LOGIN, user)
            .then(res => console.log(res.data));
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
                <label for='username'>Username: </label>
                <input
                    id='username'
                    type='text'
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <label for='password'>Password: </label>
                <input
                    id='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onChangePassword}
                />
                <input
                    type='submit'
                    value='Log In'
                />
            </form>
        );
    }
}