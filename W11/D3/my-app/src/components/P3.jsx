// Axios usage with useEffect
import { useEffect, useState } from "react";
import api from "../services/api";

export function AxiosLifecycle() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const controller = new AbortController();

        loadPosts(controller.signal);

        return () => {
            controller.abort();
        };

    }, []);

    async function loadPosts(signal) {

        setLoading(true);
        setError("");

        try {

            const response = await api.get(
                "/posts",
                { signal }
            );

            setPosts(response.data.slice(0, 5));

        }
        catch (error) {

            if (
                error.name === "CanceledError" ||
                error.code === "ERR_CANCELED"
            ) {
                return;
            }

            console.error(error);

            setError(
                error.message || "Failed to fetch posts"
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section>

            <h2>Axios Lifecycle</h2>

            {/* Loading UI */}
            {loading && <p>Loading Posts...</p>}

            {/* Error UI */}
            {!loading && error && (
                <p>Error: {error}</p>
            )}

            {/* Empty State UI */}
            {!loading && !error && posts.length === 0 && (
                <p>No posts found.</p>
            )}

            {/* Success UI */}
            {!loading &&
                !error &&
                posts.length > 0 &&
                posts.map((post) => (
                    <article key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                    </article>
                ))
            }

        </section>
    );
}