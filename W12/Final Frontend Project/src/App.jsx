import './App.css'
import AuthStatus from "./components/AuthStatus";
import MovieLoader from "./components/MovieLoader";
import MovieResults from "./components/MovieResults";
function App() {
  return (
  <>     
    <AuthStatus/>
    <MovieLoader/>
    <MovieResults/>
    </>
  );
}

export default App