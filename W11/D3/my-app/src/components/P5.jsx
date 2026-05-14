// Pagination and Caching
// Pagination: loading data page by page instead of loading
// everything at once.
// Caching: saving previously loaded data so repeated requests
// can be avoided

import { useState, useEffect } from "react";

export function PaginationCaching() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
        loadPosts();
    },[page]);

    async function loadPosts() {
        const cacheKey = `posts_page_${page}`; //tracking the page count/number
        setLoading(true);
        setError("");

        try{
            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                setPosts(JSON.parse(cachedData));
                setLoading(false);
                return;
            }
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=50`);
            if(!response.ok){
                throw new Error(`Failed to fetch posts. Status: ${response.status}`);
            }
            const data = await response.json();
            localStorage.setItem(cacheKey,JSON.stringify(data));
            setPosts(data);
        }
        catch(error){
            console.error("Error while loading posts:",error);
            setError(error.message || "Failed to load posts.");
        }
        finally{
            setLoading(false);
        }
    }
    return(
        <section>
            <h2>Pagination & Caching example</h2>
            <p>Current page: {page}</p>
             {/* Loading UI */}
            {loading && <p> Loading Posts...</p>}

            {/* Error UI */}
            {!loading && error && <p>Error: {error}</p>}

            {/* Empty State UI */}
            {!loading && !error && posts.length === 0 && <p>No Posts found.</p>}

            {/* Success UI */}
            {!loading && !error && posts.length > 0 && 
                posts.map((post)=>(
                    <article key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                    </article> 
                ))
            }    
            <button disabled={page===1||loading}
            onClick={()=>setPage((prevPage)=>prevPage-1)}>Previous</button>
            <button disabled={loading}
            onClick={()=>setPage((prevPage)=>prevPage+1)}>Next</button>
        </section>
    );
}