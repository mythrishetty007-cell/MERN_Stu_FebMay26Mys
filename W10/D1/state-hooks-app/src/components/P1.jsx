import {useState} from "react";
// useState Basics
// Its a react hook that adds state to functional component
// Returns an array with 2 value
// 1. Current state value
// 2. Function to update the state 
// Syntax:
// const [stateValue, setStateValue] = useState(initialValue);

export function UseStateBasics() {
    // counter
    const [count, setCount] = useState(0);
    // cart 
    // const [cart, setCart] = useState(0);
    return(
        <>
            <h2>useState Basics</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </>
    )
} 