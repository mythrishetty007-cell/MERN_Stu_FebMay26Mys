import {useState} from "react";
export default function GenreFilter(){
    const [genre,setGenre] = useState("All");
    function selectGenre(selectedGenre){
        setGenre(selectedGenre);
    }
    return(
        <section>
            <h3>Genre Filter</h3>
            <p>Selected Genre: {genre}</p>
            <button onClick={() => {selectGenre("Action");}}>Action</button>
            <button onClick={() => {selectGenre("Comedy");}}>Comedy</button>
            <button onClick={() => {selectGenre("Horror");}}>Horror</button>
            <button onClick={() => {selectGenre("Romantic");}}>Romantic</button>
        </section>
    )
}