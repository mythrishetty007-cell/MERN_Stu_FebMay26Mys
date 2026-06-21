// src/pages/admin/MovieManagement.jsx


import { useEffect, useState } from "react";


import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../../api/movie.api";


import MovieForm from "../../components/admin/MovieForm";


export default function MovieManagement() {
  const [movies, setMovies] = useState([]);


  const [editingMovie, setEditingMovie] = useState(null);


  const [loading, setLoading] = useState(false);


  const [error, setError] = useState("");


  async function loadMovies() {
    try {
      setLoading(true);


      const response = await getMovies();


      setMovies(response.data.movies);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load movies");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadMovies();
  }, []);


  async function handleSubmit(movieData) {
    try {
      setError("");


      if (editingMovie) {
        await updateMovie(editingMovie._id, movieData);


        setEditingMovie(null);
      } else {
        await createMovie(movieData);
      }


      await loadMovies();
    } catch (error) {
      setError(error.response?.data?.message || "Movie operation failed");
    }
  }


  async function handleDelete(movieId) {
    const confirmed = window.confirm("Delete movie?");


    if (!confirmed) {
      return;
    }


    try {
      await deleteMovie(movieId);


      await loadMovies();
    } catch (error) {
      setError(error.response?.data?.message || "Delete failed");
    }
  }


  return (
    <section>
      <header style={styles.header}>
        <div>
          <h1>Movie Management</h1>


          <p>Create, update and delete movies.</p>
        </div>
      </header>


      {error && <p style={styles.error}>{error}</p>}


      <MovieForm
        initialData={editingMovie}
        onSubmit={handleSubmit}
        buttonText={editingMovie ? "Update Movie" : "Create Movie"}
      />


      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Title</th>


                <th>Genre</th>


                <th>Rating</th>


                <th>Duration</th>


                <th>Release Date</th>


                <th>Actions</th>
              </tr>
            </thead>


            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>


                  <td>{movie.genre}</td>


                  <td>{movie.rating}</td>


                  <td>{movie.duration} mins</td>


                  <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>


                  <td>
                    <button onClick={() => setEditingMovie(movie)}>Edit</button>{" "}
                    <button onClick={() => handleDelete(movie._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}


const styles = {
  header: {
    marginBottom: "30px",
  },


  tableContainer: {
    overflowX: "auto",
  },


  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },


  error: {
    color: "red",
    marginBottom: "20px",
  },
};
