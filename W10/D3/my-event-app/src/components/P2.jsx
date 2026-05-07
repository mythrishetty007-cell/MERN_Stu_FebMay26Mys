// React Event Object
// What is it?
// React automtically passes an event object to evenet handlers
// This object contains details about the event
// e.g: input field: event.target.value 
// event: info about the input change
// event.target: the HTML input element
//event.target.value: the current text typed by the user
import { useState } from "react";
export function EventObject(){
    const [text, setText] = useState('');
    const handleChange = (event) => {
        const currentValue = event.target.value;
        console.log(currentValue);
        setText(currentValue);
    };
    return(
        <section>
            <h2>Event object</h2>
            <input type="text" value={text}
            onChange={handleChange}
            placeholder="Type something"
            />
            <p>You typed: {text}</p>
        </section>
    );
}