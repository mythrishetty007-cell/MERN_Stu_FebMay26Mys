// Passing Functions as Props
// Also called as "callback props"
// Child components has to invoke parent logic 
function ChildButton({onGreet}){
    return(
        <button onClick={onGreet}>
            Invoke Parent Function
        </button>
    )
}
export function FunctionProps(){
    const greet = () => alert('Hello from parent function');
    return(
        <>
            <h2>Passing Functions as Props</h2>
            <ChildButton onGreet={greet} />
        </>
    )
}