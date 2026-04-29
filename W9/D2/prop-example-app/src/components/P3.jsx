// Container/wrapper component
import {React} from "react";
// children is a special React Prop
// It holds nested JSX passed between component tags
// It helps create reusable wrapper/layout components
function Container({children}){
    return(
        <div className="card">
            {children}
        </div>
    );
}
// Parent component
export function PropsChildren(){
    return(
        <>
            <Container>  {/* Container is name of child component*/}
                <h3>First child element in Nested approach</h3>
            </Container>    
        </>
    )
}