// Props destructuring
import {React} from "react";
// Child component
function UserProfile({username,skill}){
    return(
        <div>
            <p>User: {username}</p>
            <p>Skill: {skill}</p>
        </div>
    )
}
// Parent component
export function PropDestrcturing(){
    return(
        <>
            <h2>Prop Destructuring</h2>
            <UserProfile username="Mythri" skill="React"/>
        </>
    );
}