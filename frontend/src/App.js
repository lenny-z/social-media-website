import React from 'react';
import Login from './Login.js'

export default class App extends React.Component {
    render() {
        return (
            <>
                <header>
                    {process.env.REACT_APP_NAME}
                </header>
                <Login />
            </>
        );
    }
}