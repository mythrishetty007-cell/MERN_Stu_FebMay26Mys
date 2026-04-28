import React from "react";
// List rendering
const users = [
    {id:1, role:"Student"},
    {id:2, role:"Trainer"},
    {id:3, role:"Admin"},
    {id:4, role:"Developer"}
];

export function FunctionComp(){
    return(
        <div>
            <h2>Functional components</h2>
            {/* List rendering */}
            {users.map((user)=>(
                <p key={user.id} className="pclass">
                    {user.role}
                </p>
            ))}
        </div>
    );
}