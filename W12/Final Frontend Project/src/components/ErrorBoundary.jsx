// Error boundaries prevent the entire app from crashing whan a child component
// fails / throws an error during rendering
// Fallback UI
import React from "react"; 
class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error){
        return{
            hasError: true
        };
    }

    componentDidCatch(error,errorInfo){
        console.error("Error boundary caought an error",error);
        console.error("Component Stack: ",errorInfo);
    
}
render(){
    // Fallback UI
    if (this.state.hasError) {
        return(
            <section style={styles.container}>
                <h2>Something went wrong</h2>

            </section>
        );
    }
    return this.props.children;
}
}

export default  ErrorBoundary;

const styles = {
    container: {
        border : "1px solid #e57373",
        padding: "20px",
        borderRadius: "6px"
    }
};