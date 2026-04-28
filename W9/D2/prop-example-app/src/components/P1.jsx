import {React} from "react";
// Props basics
// Child Component
function WelcomeCard(props){
    return(
        <div className="card">
            <h2>Hello,{props.name}</h2>
            <p>Role: {props.role}</p>
        </div>
    )
} 
// Parent Component
export function PropBasics(){
    return(
        <>
            <WelcomeCard name="Mythri" role="React developer"/>
            <WelcomeCard name="Developer" role="UI/UX developer"/>
        </>
    );
}