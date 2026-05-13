// Nested Dynamic Routes
import { Link,Outlet,useParams } from "react-router-dom";

export function NestedDynamicRoutes() {
    const { courseId } = useParams();
    
    return(
        <div>
            <h2>Nested Dynamic Routes</h2>
            <p>Course id: {courseId}</p>
            <nav>
                <Link to={`/courses/${courseId}/modules/1`}>Module 1</Link> | {' '}
                <Link to={`/courses/${courseId}/modules/2`}>Module 2</Link> | {' '}
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}