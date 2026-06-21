// src\pages\MovieDetails.jsx
import { useEffect, useState } from "react";


import { useNavigate, useParams } from "react-router-dom";


import LoadingSpinner from "../components/LoadingSpinner";
import ShowCard from "../components/ShowCard";


import { getMovieById } from "../api/movie.api";
import { getShows } from "../api/show.api";


export default function MovieDetails() {
  const { id } = useParams();


  const navigate = useNavigate();


  const [movie, setMovie] = useState(null);


  const [shows, setShows] = useState([]);


  const [loading, setLoading] = useState(true);


  const [error, setError] = useState("");


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);


        const movieResponse = await getMovieById(id);


        setMovie(movieResponse.data);


        const showsResponse = await getShows({
          movieId: id,
        });


        setShows(showsResponse.data);


        setError("");
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load movie details",
        );
      } finally {
        setLoading(false);
      }
    }


    fetchData();
  }, [id]);


  function handleBook(show) {
    navigate("/bookings", {
      state: {
        movie,
        show,
      },
    });
  }


  if (loading) {
    return <LoadingSpinner />;
  }


  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }


  return (
    <section>
      <h1>{movie.title}</h1>


      <p>Genre: {movie.genre}</p>


      <p>Rating: {movie.rating}</p>


      <p>Duration: {movie.duration} mins</p>


      <h2 style={{ marginTop: "40px" }}>Available Shows</h2>


      {shows.length === 0 ? (
        <p>No shows available.</p>
      ) : (
        <div style={styles.grid}>
          {shows.map((show) => (
            <ShowCard key={show._id} show={show} onBook={handleBook} />
          ))}
        </div>
      )}
    </section>
  );
}


const styles = {
  grid: {
    display: "grid",
    gap: "20px",
    marginTop: "20px",
  },
};