// Props vs State
// Props: data passed from parent to child component
    // data comes from outside the component
    // are read-only
    // are used for passing data between components 
// State: data managed inside a component
    // belongs to the component itself
    // can be modified/changed
    // setter method is used to modify data

import { useState } from "react"

function Child({title}){
    return <p>Props: {title}</p>
}    

export function PropsState(){
    const [stateValue, setStateValue] = useState('Local State');
    return(
        <>
            <h3>Props vs State</h3>
            <Child title="Parent data" />

            <p>State: {stateValue}</p>
            <button onClick={()=>setStateValue('This is New state')}>
                Update State
            </button>
        </>
    )
}