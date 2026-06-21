// MERN_Stu_FebMay26Mys\W12\Master_bookmyshow-frontend\src\components\admin\MovieForm.jsx
import { useState, useEffect } from "react";


export default function MovieForm({ initialData, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    rating: "",
    duration: "",
    releaseDate: "",
    poster: "",
  });


  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        releaseDate: initialData.releaseDate
          ? initialData.releaseDate.split("T")[0]
          : "",
      });
    }
  }, [initialData]);


  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }


  function handleSubmit(event) {
    event.preventDefault();


    onSubmit(formData);


    setFormData({
      title: "",
      genre: "",
      rating: "",
      duration: "",
      releaseDate: "",
      poster: "",
    });
  }


  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name="title"
        placeholder="Movie Title"
        value={formData.title}
        onChange={handleChange}
        required
      />


      <select
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required
      >
        <option value="">Select Genre</option>


        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Romance">Romance</option>
        <option value="Thriller">Thriller</option>
      </select>


      <input
        type="number"
        step="0.1"
        min="1"
        max="5"
        name="rating"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
        required
      />


      <input
        type="number"
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleChange}
        required
      />


      <input
        type="date"
        name="releaseDate"
        value={formData.releaseDate}
        onChange={handleChange}
        required
      />


      <input
        name="poster"
        placeholder="Poster URL"
        value={formData.poster}
        onChange={handleChange}
      />


      <button type="submit">{buttonText}</button>
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
