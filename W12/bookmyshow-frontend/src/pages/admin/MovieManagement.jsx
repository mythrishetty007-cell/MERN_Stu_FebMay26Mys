// src/pages/admin/MovieManagement.jsx


/*
=========================================================
SPRINT 1 – MOVIE MANAGEMENT


TOPICS COVERED:


✓ Rendering Lists
✓ Reusable Components
✓ Event Handling
✓ Conditional UI
✓ Administrative Interfaces


WHY THIS COMPONENT?


Administrators need the ability to
manage movie data.


Sprint 1:


Administrative Shell


Sprint 6:


Movie CRUD APIs
↓
Poster Upload
↓
Validation
↓
Pagination


=========================================================
*/


const movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    language: "English",
  },


  {
    id: 2,
    title: "Dune",
    genre: "Sci-Fi",
    language: "English",
  },


  {
    id: 3,
    title: "Kantara",
    genre: "Action",
    language: "Kannada",
  },
];


export default function MovieManagement() {
  function handleAddMovie() {
    alert("Sprint 6: Add Movie API Integration");
  }


  function handleEditMovie(movieId) {
    alert(`Sprint 6: Edit Movie ${movieId}`);
  }


  function handleDeleteMovie(movieId) {
    alert(`Sprint 6: Delete Movie ${movieId}`);
  }


  return (
    <section>
      {/* Header */}


      <header style={styles.header}>
        <div>
          <h1>Movie Management</h1>


          <p>Manage movies available on the platform.</p>
        </div>


        <button style={styles.addButton} onClick={handleAddMovie}>
          Add Movie
        </button>
      </header>


      {/* Movie Table */}


      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Title</th>


              <th>Genre</th>


              <th>Language</th>


              <th>Actions</th>
            </tr>
          </thead>


          <tbody>
            {movies.map((movie) => (
              <MovieRow
                key={movie.id}
                movie={movie}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
              />
            ))}
          </tbody>
        </table>
      </div>


      {/* Future Enhancements */}


      <section style={styles.future}>
        <h2>Upcoming Sprint 6 Enhancements</h2>


        <ul>
          <li>Movie CRUD APIs</li>


          <li>Poster Uploads</li>


          <li>Validation</li>


          <li>Pagination</li>


          <li>Search & Filters</li>
        </ul>
      </section>
    </section>
  );
}


function MovieRow({
  movie,


  onEdit,


  onDelete,
}) {
  return (
    <tr>
      <td>{movie.title}</td>


      <td>{movie.genre}</td>


      <td>{movie.language}</td>


      <td>
        <button onClick={() => onEdit(movie.id)}>Edit</button>{" "}
        <button onClick={() => onDelete(movie.id)}>Delete</button>
      </td>
    </tr>
  );
}


const styles = {
  header: {
    display: "flex",


    justifyContent: "space-between",


    alignItems: "center",


    marginBottom: "30px",
  },


  addButton: {
    padding: "10px 15px",


    cursor: "pointer",
  },


  tableContainer: {
    overflowX: "auto",
  },


  table: {
    width: "100%",


    borderCollapse: "collapse",


    background: "#fff",
  },


  future: {
    marginTop: "35px",


    background: "#fff",


    border: "1px solid #ddd",


    borderRadius: "8px",


    padding: "25px",
  },
};


/*
=========================================================
FLOW


Admin
↓
Movie Management
↓
View Movies
↓
Add/Edit/Delete Actions
↓
Sprint 6 API Enhancements


=========================================================


KEY TAKEAWAYS


1. Administrative interfaces evolve
   progressively.


2. Tables are common admin patterns.


3. Reusable rows improve readability.


4. Sprint 6 enhances this page
   rather than rebuilding it.


=========================================================


VERIFICATION


✓ Movie table renders correctly


✓ Add Movie button works


✓ Edit button works


✓ Delete button works


✓ Responsive table works


✓ No console errors


✓ Sprint 6 ready


=========================================================
*/