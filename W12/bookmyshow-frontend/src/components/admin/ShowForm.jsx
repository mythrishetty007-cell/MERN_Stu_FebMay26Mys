import { useState } from "react";


export default function ShowForm({ movies, onSubmit }) {
  const [formData, setFormData] = useState({
    movieId: "",
    date: "",
    time: "",
    totalSeats: 50,
  });


  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }


  function handleSubmit(event) {
    event.preventDefault();


    onSubmit(formData);
  }


  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <select
        name="movieId"
        value={formData.movieId}
        onChange={handleChange}
        required
      >
        <option value="">Select Movie</option>


        {movies.map((movie) => (
          <option key={movie._id} value={movie._id}>
            {movie.title}
          </option>
        ))}
      </select>


      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />


      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />


      <input
        type="number"
        name="totalSeats"
        value={formData.totalSeats}
        onChange={handleChange}
      />


      <button type="submit">Create Show</button>
    </form>
  );
}


const styles = {
  form: {
    display: "grid",
    gap: "10px",
    marginBottom: "30px",
  },
};