// Multiple Dynamic Params
import { useParams } from "react-router-dom";

export function MultipleDynamicParams() {
    const { userId,orderId } = useParams();
    return(
        <div>
            <h2>Multiple Dynamic Params</h2>
            <p>User ID from URL : {userId}</p>
            <p>Order ID from URL : {orderId}</p>
        </div>
    )
}