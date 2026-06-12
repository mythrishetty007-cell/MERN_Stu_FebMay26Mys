export default function MovieCard(props){
    // const movie = {
    //     title: "Inception",
    //     genre: "Sci-Fi",
    //     rating: 4.8,
    //     duration: "2h 28m"
    // };

    return(
        <div className="movie-card">
            {/* Destructuring props  */}
            <img src={props.poster} alt={props.title} />
            <h3>{props.title}</h3>
            <p>Genre: {props.genre}</p>
            <p>Rating: {props.rating}</p>
            <p>Duration: {props.duration}</p>
            <button>Book Now</button>
        </div>
    );
}