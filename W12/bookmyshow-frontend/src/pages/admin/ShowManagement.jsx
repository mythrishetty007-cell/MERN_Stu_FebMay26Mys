import { useEffect, useState } from "react";


import { getMovies } from "../../api/movie.api";


import { getShows, createShow, deleteShow } from "../../api/show.api";


import ShowForm from "../../components/admin/ShowForm";


export default function ShowManagement() {
  const [movies, setMovies] = useState([]);


  const [shows, setShows] = useState([]);


  async function loadData() {
    const movieResponse = await getMovies();


    const showResponse = await getShows();


    setMovies(movieResponse.data.movies);


    setShows(showResponse.data);
  }


  useEffect(() => {
    loadData();
  }, []);


  async function handleCreate(showData) {
    await createShow(showData);


    loadData();
  }


  async function handleDelete(id) {
    await deleteShow(id);


    loadData();
  }


  return (
    <section>
      <h1>Show Management</h1>


      <ShowForm movies={movies} onSubmit={handleCreate} />


      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Movie</th>
            <th>Date</th>
            <th>Time</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>


        <tbody>
          {shows.map((show) => (
            <tr key={show._id}>
              <td>{show.movieId?.title}</td>


              <td>{new Date(show.date).toLocaleDateString()}</td>


              <td>{show.time}</td>


              <td>{show.availableSeats}</td>


              <td>
                <button onClick={() => handleDelete(show._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}