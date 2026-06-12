import {useState} from "react";
export default function CitySelector(){
    const [city,setCity] = useState("Mysuru");
    return(
        <section>
            <h2>Selected City</h2>
            <p>{city}</p>
            <button
             onClick={()=>{
                setCity("Mandya");
                }}>Mandya</button>
            <button 
            onClick={()=>{
                setCity("Bengaluru");
                }}>Bengaluru</button>
        </section>
    )
}