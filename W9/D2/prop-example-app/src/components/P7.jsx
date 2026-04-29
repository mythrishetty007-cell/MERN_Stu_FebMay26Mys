function UserCard({user}){
    return(
        <div className="card">
            <p>Name: {user.name}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}
function SkillsList({ skills }){
    return(
        <ul>
            {skills.map((skill)=>(
                <li key={skill}>{skill}</li>
            ))}
        </ul>
    )
}
export function ObjectsAndArrayProps(){
    const user = {
        name: 'Mythri',
        role: 'Developer',
    }; //object
    const skills = ['React','TailwindCSS','Vite']; //array
    return(
        <>
            <h2>Passing Objects and Arrays as Props</h2>
            <UserCard user={user} />
            <SkillsList skills={skills} />
        </>
    );
}