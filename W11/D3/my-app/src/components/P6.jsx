// Error boundary & file upload progress
// Error boundary: its a special class component that catches
// rendering errors in its child component tree and shows a fallback UI
// Error boundary does not catch:
    // errors inside event handlers
    // errors inside setTimeout/ setInterval
    // errors inside async code etc
    // It is used only for "rendering and lifecycle methods errors"

import React,{ useState, useEffect, useRef } from "react";

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
    this.state = {
        hasError: false,
        errorMessage:  "",
    };
}    
// Lifecycle method updates state when a child throws an error during rendering 
static getDerivedStateFormError(error){
    return{  //method
        hasError: true,
        errorMessage: error.message || "Something went wrong",
    };
}

componentDidCatch(){ //login of the errors
    console.error("Error caught by ErrorBoundary:",error,errorInfo);
}
render(){
    if (this.state.hasError) {
        return( //renderfunction
            <section>
                <h2>Something went wrong</h2>
                <p>{this.state.errorMessage}</p>
            </section>
        );
    } return this.props.children;
}
}

function UploadComponent() {
    const [progress,setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const intervalRef = useRef(null);

    useEffect(()=>{
        return()=>{
            clearInterval(intervalRef.current);
        };
    },[]);

    function startUpload() { 
        if(isUploading){ //If upload is already running, then do nothing
            return;
        }
        setProgress(0);
        setIsUploading(true);
        
        intervalRef.current = setInterval(()=>{
            setProgress((prevProgress)=>{
                const nextProgress = prevProgress + 10;

                if (nextProgress >=100) {
                    clearInterval(intervalRef.current);
                    setIsUploading(false);
                    return 100;
                }
                return nextProgress;
            });
        },300);
    }

    function resetUpload() {
        clearInterval(intervalRef.current);
        setProgress(0);
        setIsUploading(false);
    }
    return(
        <section>
            <h2>File upload & error boundaries</h2>
            <button onClick={startUpload}
            disabled={isUploading}>{isUploading?"Uploading...":"Upload File"}
            </button>
            <button onClick={resetUpload}
            disabled={isUploading && progress===0}>Reset
            </button>
            <progress value={progress} max="100"></progress>
            <p>{progress}%</p>
            {progress === 100 && <p>Upload Complete.</p>}
        </section>
    );
}
export function UploadErrorBoundary() {
    return(
        <ErrorBoundary>
            <UploadComponent />
        </ErrorBoundary>
    );
}