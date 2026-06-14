// src/pages/Movies.jsx


/*
=========================================================
SPRINT 1 – MOVIES PAGE


TOPICS COVERED:


✓ Rendering Lists
✓ map()
✓ Reusable Components


WHY THIS COMPONENT?


This page introduces the concept
of movie discovery.


Sprint 1:


Static Data


Sprint 3:


Redux Toolkit
↓
API Integration
↓
Search
↓
Filters
↓
Pagination


=========================================================
*/


const movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
  },


  {
    id: 2,
    title: "Inception",
    genre: "Thriller",
  },


  {
    id: 3,
    title: "Dune",
    genre: "Sci-Fi",
  },
];


export default function Movies() {
  return (
    <section>
      <h1>Movies</h1>


      <p>Explore currently available movies.</p>


      <div style={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}


function MovieCard({ movie }) {
  return (
    <div style={styles.card}>
      <h3>{movie.title}</h3>


      <p>Genre: {movie.genre}</p>
    </div>
  );
}


const styles = {
  grid: {
    marginTop: "30px",


    display: "grid",


    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",


    gap: "20px",
  },


  card: {
    background: "#fff",


    border: "1px solid #ddd",


    padding: "20px",


    borderRadius: "6px",
  },
};


/*
=========================================================
KEY TAKEAWAYS


1. Arrays drive the UI.


2. map() is fundamental in React.


3. Static data evolves naturally
   into API-driven data.


=========================================================
*/
