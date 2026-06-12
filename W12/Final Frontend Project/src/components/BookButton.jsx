export default function BookButton() {
    function handleBooking(){
        alert("Proceeding to booking page...");
    }
    return(
        <section>
            <h3>Book Movie</h3>
            <button onClick={handleBooking}>Book Movie</button>
        </section>
    )
}