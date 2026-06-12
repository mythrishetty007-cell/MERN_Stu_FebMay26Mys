import {useState} from "react";
export default function (){
    const [movies,setMovies] = useState([]);

    return(
        <section>
            <h2>Search results</h2>
            {movies.length === 0 ? <p>No Movies Found</p> :
            <ul>
                {movies.map((movie)=>(<li key={movie}>{movie}</li>))}
                </ul>}
                <button onClick = {() => {
                    setMovies(["Inception","Dhurandar","XYZ"])
                }}>Load Movies</button>
        </section>
    )

}