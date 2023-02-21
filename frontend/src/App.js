import React from 'react';
import Header from './Header.js';
import { Outlet } from 'react-router-dom';
import './App.css';

export default class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Outlet />
            </>
        );
    }
}