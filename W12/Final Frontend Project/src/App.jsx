import './App.css'
import BookButton from "./components/BookButton";
import GenreFilter from"./components/GenreFilter";
import LoginForm from "./components/LoginForm";
import SearchShortcut from "./components/SearchShortcut";
function App() {
  return (
  <>     
    <BookButton/>
    <GenreFilter/>
    <LoginForm/>
    <SearchShortcut/>
    </>
  );
}

export default App