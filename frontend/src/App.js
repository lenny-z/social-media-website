import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login.js';
import Error from './Error.js';
import './App.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <Error />
    }
])

export default class App extends React.Component {
    render() {
        return (
            <>
                <header>
                    {process.env.REACT_APP_NAME}
                </header>
                <RouterProvider router={router} />
            </>
        );
    }
}