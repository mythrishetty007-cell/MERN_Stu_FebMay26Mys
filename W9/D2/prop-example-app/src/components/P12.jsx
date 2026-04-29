// Higher order component(HOC) example

const Greeting = ({name}) => {
    return <h1>Hello, {name}</h1>
}

// Higher order component(HOC)
const WithBorder = (OriginalComponent) => {
    return function EnhancedComponent(props){
        return(
            <div className="setBorder">
                <OriginalComponent{...props}/>
            </div>
        );
    }
}
const GreetingWithBorder = WithBorder(Greeting);

export function HOCExample(){
    return(
        <>
            <GreetingWithBorder name="Mythri"/>
        </>
    )
}