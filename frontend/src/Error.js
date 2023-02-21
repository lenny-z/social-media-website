import Header from './Header.js';
import { useRouteError } from 'react-router-dom';

export default function Error() {
    const err = useRouteError();
    console.error(err);

    return (
        <>
            <Header />
            <p className='error-message'>Sorry, an unexpected error occured: {err.status} {err.statusText}</p>
        </>
    );
}