import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                {process.env.REACT_APP_NAME}
            </header>
        );
    }
}