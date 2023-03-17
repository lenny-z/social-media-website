// import React from 'react';
import { useState } from 'react';
import axios from 'axios';

// export default class Home extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <>
//                 Home
//             </>
//         );
//     }
// }

export default function Home() {
    const [text, setText] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const post = {
            text: text
        };

        const res = await axios.post(process.env.REACT_APP_POST, post);
    }

    function handleText(event) {
        setText(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                id='post'
                type='text'
                value={text}
                onChange={handleText}
            />
            <input
                type='submit'
                value='Post'
            />
        </form>
    );
}