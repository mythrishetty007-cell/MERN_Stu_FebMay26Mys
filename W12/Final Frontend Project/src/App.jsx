import "./App.css";

import MovieExplorer from "./components/MovieExplorer";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App(){
  return(
    <div>
      <header>
          <ErrorBoundary>
              <MovieExplorer />
          </ErrorBoundary>
      </header>
    </div>
  )
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