// MERN_Stu_FebMay26Mys\W12\Master_bookmyshow-frontend\src\pages\admin\ShowManagement.jsx
import { useEffect, useState } from "react";


import { getMovies } from "../../api/movie.api";


import {
  getShows,
  createShow,
  updateShow,
  deleteShow,
} from "../../api/show.api";


import ShowForm from "../../components/admin/ShowForm";


export default function ShowManagement() {
  const [movies, setMovies] = useState([]);


  const [shows, setShows] = useState([]);


  const [editingShow, setEditingShow] = useState(null);


  async function loadData() {
    const movieResponse = await getMovies();


    const showResponse = await getShows();


    setMovies(movieResponse.data.movies);


    setShows(showResponse.data);
  }


  useEffect(() => {
    loadData();
  }, []);


  async function handleSubmit(showData) {
    if (editingShow) {
      await updateShow(editingShow._id, showData);


      setEditingShow(null);
    } else {
      await createShow(showData);
    }


    loadData();
  }


  async function handleDelete(id) {
    const confirmed = window.confirm("Delete show?");


    if (!confirmed) return;


    await deleteShow(id);


    loadData();
  }


  return (
    <section>
      <h1>Show Management</h1>


      <ShowForm
        movies={movies}
        onSubmit={handleSubmit}
        initialData={editingShow}
        buttonText={editingShow ? "Update Show" : "Create Show"}
      />


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
                <button onClick={() => setEditingShow(show)}>Edit</button>{" "}
                <button onClick={() => handleDelete(show._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
