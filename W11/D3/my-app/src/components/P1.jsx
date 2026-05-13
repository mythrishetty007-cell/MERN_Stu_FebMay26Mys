// Managing API state with useEffect
import { useEffect, useState } from "react";
export function ManagingApiState() {
    // user state: stores the list of users returned from API
    const [users, setUsers] = useState([]);
    
    // true while data is being fetched 
    const [loading, setLoading] = useState(false);
    // To store error message 
    const [error, setError] = useState("");

    // The following function accepts "signal" so the request can be cancelled
    // by AbortController during cleanup
    async function loadUsers(signal) {
        setLoading(true);
        setError("");
        try{
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users",
                {signal}
            );

            if(!response.ok){
                throw new Error(`Failed with status ${response.status}`);
            }

            const data = await response.json();

            setUsers(data);
        }
        catch(error){
            if (error.name === "AbortError"){
                return;
            }
            console.error(error);
            setError(error.message || "Failed to fetch users");
        }
        finally{
            setLoading(false);
        }
    }
    // What happens in useEffect()
        //1. Create an AbortController
        //2. Start the API request
        //3. Return a cleanup function that aborts the request if 
            // the component unmounts  
    useEffect(()=>{
        const controller = new AbortController();
        loadUsers(controller.signal);
        return () => {
            controller.abort();
        };
    },[]);

    // Reload function
    function handleReload() {
        const controller = new AbortController();
        loadUsers(controller.signal);
    }

    return(
        <section>
            <h2>Managing API State</h2>
            <button onClick={handleReload} disabled={loading}>
                {loading ? "Loading..." : "Reload Users "}</button>

            {/* Loading UI */}
            {loading && <p> Loading Users...</p>}

            {/* Error UI */}
            {!loading && error && <p>Error: {error}</p>}

            {/* Empty State UI */}
            {!loading && !error && users.length === 0 && <p>No users found.</p>}

            {/* Success UI */}
            {!loading && !error && users.length > 0 && 
                users.map((user)=>(
                    <article key={user.id}>
                        <h4>{user.name}</h4>
                        <p>Email: {user.email}</p>
                        <p>Company: {user.company?.name}</p>
                        <p>City: {user.address?.city}</p>
                    </article> 
                ))
            } 
        </section> 
    );
}