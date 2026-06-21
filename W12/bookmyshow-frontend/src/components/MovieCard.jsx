// src/components/MovieCard.jsx
import { useNavigate } from "react-router-dom";


export default function MovieCard({ movie }) {
  const navigate = useNavigate();


  return (
    <div style={styles.card} onClick={() => navigate(`/movies/${movie._id}`)
      }
>
      <h3>{movie.title}</h3>


      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>


      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>


      <p>
        <strong>Duration:</strong> {movie.duration} mins
      </p>


      <p>
        <strong>Release:</strong>{" "}
        {new Date(movie.releaseDate).toLocaleDateString()}
      </p>
    </div>
  );
}


const styles = {
  card: {
    cursor: "pointer",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
  },
};
