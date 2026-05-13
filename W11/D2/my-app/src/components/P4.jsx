// Optional parameters
import { useParams } from "react-router-dom";

export function OptionalParameters() {
    const { username } = useParams();

    return(
        <div>
            <h2>Optional Parameters</h2>
            {username ? (
                <p>Hello, {username}</p>
            ):( <p>Hello, User</p>)}
        </div>
    );
}