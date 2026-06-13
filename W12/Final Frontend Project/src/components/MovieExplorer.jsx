import { useEffect, useMemo, useState } from "react";
const MOVIES = [
    {id:1, title: "Inception", genre: "Sci-Fi"},
    {id:2, title: "Interstellar", genre: "Sci-Fi"},
    {id:3, title: "Avengers", genre: "Action"},
    {id:4, title: "Oppenheimer", genre: "Drama"},
    {id:5, title: "Deadpool", genre: "Comedy"},
    {id:6, title: "SpiderMan", genre: "Action"}
];
const ITEMS_PER_PAGE = 3;
export default function MovieExplorer() {
    const [movies, setMovies] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(()=>{
        let isMounted = true;
        const cachedMovies = localStorage.getItem("bookmyshow-movies");

        if (cachedMovies) {
            setMovies(JSON.parse(cachedMovies));      
        
        setLoading(false);
        return;
    }
    const timer = setTimeout(() => {
        try{
                if (isMounted) {
                setMovies(MOVIES);
                localStorage.setItem("bookmyshow-movies",JSON.stringify(MOVIES));
                setLoading(false);
                }
            }
            catch{
                if (isMounted) {
                    setError("Failed to load movies");
                    setLoading(false);
                }
            }
    }, 1500);
        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
},[]);
const filteredMovies = useMemo(()=>{
    return movies.filter(movie => 
        movie.title.toLowerCase().includes(search.toLowerCase())
    );
}, [movies,search]);

// Pagination
const totalPages = Math.ceil(filteredMovies.length/ITEMS_PER_PAGE);

const paginatedMovies = filteredMovies.slice(
    (page-1)*ITEMS_PER_PAGE,page*ITEMS_PER_PAGE
);

// Reset page
useEffect(()=>{
    setPage(1);
},[search]);

// Loading UI
if (loading) {
    return(
        <section>
            <h2>Loading movies</h2>
            <p>Please wait</p>
        </section>
    )
}

// Error UI
if (error) {
    return(
        <section>
            <h2>Error</h2>
            <p>{error}</p>
        </section>
    )
}
return(
    <section>
        <h2>Now showing</h2>
        {/* Search */}
        <input type="text" placeholder = "Search Movies..." value={search} 
        onChange={(event)=>{
            setSearch(event.target.value);
        }} style= {styles.input}/>
        {
            filteredMovies.length === 0 && (
                <p>No movies found</p>
            )
        }

        {/* movie Listing */}
        <ul style={styles.list}>
            {
                paginatedMovies.map(movie=>(
                    <li key={movie.id} style = {styles.card}> 
                        <h3>{movie.title}</h3>
                        <p>Genre: {""}{movie.genre}</p>
                    </li>
                ))
            }
        </ul>

        {/* pagination */}
        {
            totalPages > 1 && (
                <div style={styles.pagination}>
                    <button style={styles.button}
                    disabled= {page === 1}
                    onClick = {()=>{
                        setPage(prev => prev-1);
                    }}>Previous</button>

                    <span>Page {page} of {totalPages}</span>

                    <button style={styles.button}
                    disabled= {page === totalPages}
                    onClick = {()=>{
                        setPage(prev => prev+1);
                    }}>Next</button>
                </div>
            )
        }
    </section>
);
}
const styles = {
    input: {
        padding:"8px",
        width:"100%",
        maxWidth:"300px",
        marginBottom: "20px"
    },
    list: {
        listStyle : "none",
        padding : 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))",
        gap:"15px"
    },
    card:{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "6px"
    },
    pagination:{
        gap: "15px",
        alignItems:"center"
    },
    button:{
        padding: "8px 12px"
    }
};