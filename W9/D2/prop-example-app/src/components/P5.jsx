// import React, {useState} from "react";
import {useState} from "react";
// State Lifting: moving shared state up to the 
// closest common parent
// We use this:
// Multiple child components need to share the same data
// Props drilling becomes too complex
// Child components need to update the same data

// First Child Component
function NameInput1({value, onChange}){
    return(
        <div>
            <label>Input 1:</label>
            <input value={value} 
            onChange = {(e)=>onChange(e.target.value)}
            placeholder="Type a name..."
            />
        </div>
    )
}
// Second Child Component
function NameInput2({value,onChange}){
    return(
         <div>
            <label>Input 2:</label>
            <input value={value} 
            onChange = {(e)=>onChange(e.target.value)}
            placeholder="This gets updated..."
            />
        </div>
    )
}

// Parent component
export function SharedStateParent(){
    const [name, setNames] = useState('');
    return(
        <div>
            <h3>Shared state demo</h3>

            <NameInput1 value={name} onChange={setNames}/>
            <NameInput2 value={name} onChange={setNames}/>
            <div>
                <strong>Current Name: </strong> {name || 'Nothing typed yet'}
            </div>
        </div>
    );
}