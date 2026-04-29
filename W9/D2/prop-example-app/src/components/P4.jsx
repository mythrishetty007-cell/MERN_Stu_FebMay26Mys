import {React} from "react";
// Prop drilling
function DrillLayout({ user }){
    return(
        <div>
            <DrillSidebar user={user}/>
        </div>
    )
}
function DrillSidebar({ user }){
    return(
        <aside className="sidebar">
            <DrillUserPanel user={user} />
        </aside>
    )
}
function DrillUserPanel({ user }){
    return(
        <section className="user-panel">
            <ProfileAvatar user={user} />
        </section>
    )
}
function ProfileAvatar({ user }){
    return <img src={`/${user.name}.png`} alt={user.name}/> 
}

export function PropDrillingDemo(){
    const user = {name: 'Mythri'};
    return(
        <div>
            <h3>Problem: prop drilling</h3>
            <DrillLayout user={user}/>
        </div>
    )
}