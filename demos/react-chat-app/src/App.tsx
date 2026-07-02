import {useState} from 'react';
import Message from './components/Message';
import { faker } from "@faker-js/faker";
import './App.css';

const App = () => {
    const [messages, setMessages] = useState([]);
    // this is a comment
    /* this is another comment */
    return <>
        <h1>
            Chatroom
        </h1>

        {
            messages.map(
                ({text, name, timestamp}, index) =>
                    <Message
                        key={index}
                        text={text}
                        name={name}
                        timestamp={timestamp}
                    />
                )
        }

        <form onSubmit={(event) => {
            event.preventDefault();

            // determine what the new message is
            const new_message = event.target.incoming_text.value;

            // generate a fake name for this particular message
            const name = faker.person.fullName();

            // add the new message to the message state
            // @ts-expect-error
            setMessages([...messages,
            // @ts-expect-error
                {
                    text: new_message,
                    name: name,
                    timestamp: new Date()
                }
            ]);

            // note: this is not best practice in react but it works for now
            // @ts-expect-error
            document.getElementById('incoming_text').value = '';
        }}>
            <input name='incoming_text' id='incoming_text' />
            <button type='submit'>
                send
            </button>
        </form>
        // this is an example of using the onClick handler
        <button onClick={() => {
            alert('hello');
        }}>
            click me
        </button>
    </>;
}

export default App;