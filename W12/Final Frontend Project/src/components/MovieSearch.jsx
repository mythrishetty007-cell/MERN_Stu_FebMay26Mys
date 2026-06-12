import { useState } from "react";
export default function MovieSearch() {
  const [search, setSearch] = useState("");
  return (
    <section>
        <h3>Search Movies</h3>
        <input type="text" value={search} placeholder = "Search movie .."
        // Event object
        onChange={(event) => {
            setSearch(event.target.value);
        }} 
        />
        <p>
            Searching for : {search}
        </p>
    </section>
  );
}