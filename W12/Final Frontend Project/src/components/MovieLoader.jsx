import { useState } from "react";
export default function MovieLoader() {
    const [isLoading,setIsLoading] = useState(true);

    return(
        <section>
            <h2>Movies</h2>
            {isLoading ? <p>Loading Movies...</p> : <p>Movie loaded successfully</p>}
            <button onClick={() => {setIsLoading(!isLoading);}}>Toggle Loading</button>
        </section>
    )
}