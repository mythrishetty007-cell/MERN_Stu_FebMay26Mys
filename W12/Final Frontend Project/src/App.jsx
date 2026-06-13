import "./App.css";
import { Routes, Route, useParams, useNavigate, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardSection from "./components/DashboardSection";

const isAuthenticated = true;
function ProtectedRoute({children}) {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return children;
}

function HomePage() {
    return(
      <section>
        <h2>Home</h2>
        <p>Welcome to Bookmyshow</p>
      </section>
    );
}
function MoviePage() {
  const navigate = useNavigate();
  const movies = [
    {
      id:101,
      title:"Inception"
    },
    {
      id:102,
      title:"Interstellar"
    },
  ];
  return(
    <section>
      <h2>Movies</h2>
      <p>Click a movie to view details</p>
      <ul>
        {movies.map((movie)=>(
          <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
function MovieDetailsPage() {
  const {movieId} = useParams();
  return(
    <section>
      <h3>Movie Details</h3>
      <p>Movie ID:{movieId}</p>
    </section>
  );
}
function LoginPage(){
  const navigate = useNavigate();
  return(
    <section>
      <h2>Login</h2>
      <p>Login Screen</p>
      <button
        style={styles.button}
        onClick={()=>{
          navigate("/bookings");
        }}
      >Login</button>
    </section>
  );
}
function SignupPage(){
  return(
    <section>
      <h2>Signup</h2>
      <p>New users can register here.</p>
    </section>
  );
}
function BookingsPage(){
  return(
    <section>
      <h2>My Bookings</h2>
      <p>Protected Page.</p>
    </section>
  );
}
function DashboardOverview(){
  return(
    <section>
      <h2>Dashboard Overview</h2>
      <p>Booking stats.</p>
    </section>
  );
}
function DashboardMovies(){
  return(
    <section>
      <h2>Dashboard Movies</h2>
      <p>Manage movies here.</p>
    </section>
  );
}
function NotFoundPage(){
  return(
    <section>
      <h2>404</h2>
      <p>Page not found.</p>
    </section>
  );
}
export default function App() {
  return (
    <div style={styles.container}>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/movies" element={<MoviePage/>} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route path="/bookings" 
            element={
            <ProtectedRoute>
                <BookingsPage /> 
            </ProtectedRoute>
        } />

        {/* Nested Dashboard Routes */}
        <Route path="/dashboard" 
            element={
            <ProtectedRoute>
                <DashboardSection /> 
            </ProtectedRoute>
        } />

        {/* Index Route */}
        <Route index element={<DashboardOverview />}/>
        <Route path="movies" element={<DashboardMovies />}/>
        {/* <Route path="shows" element={<DashboardShows />}/> */}

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

const styles = {
  container:{
    maxWidth: "900px",
    margin:"0 auto",
    padding: "20px",
  },
  button: {
    padding: "8px 12px",
    marginTop:"8px",
  },
};