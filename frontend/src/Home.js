import { useState } from 'react';
import axios from 'axios';

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
        <form
            id='post-form'
            onSubmit={handleSubmit}
        >
            <textarea
                id='post-input'
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