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
      setFormData(initialData);
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
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />


      <input
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />


      <input
        type="number"
        step="0.1"
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