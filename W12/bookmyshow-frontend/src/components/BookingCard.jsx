// src/components/BookingCard.jsx


export default function BookingCard({ booking, onCancel }) {
  const movie = booking.showId?.movieId;


  return (
    <div style={styles.card}>
      <h3>{movie?.title}</h3>


      <p>Seats: {booking.seats.join(", ")}</p>


      <p>Status: {booking.status}</p>


      <p>Show Date: {new Date(booking.showId?.date).toLocaleDateString()}</p>


      <p>Time: {booking.showId?.time}</p>


      {booking.status === "booked" && (
        <button onClick={() => onCancel(booking._id)}>Cancel Booking</button>
      )}
    </div>
  );
}


const styles = {
  card: {
    border: "1px solid #ddd",


    padding: "20px",


    borderRadius: "8px",


    marginBottom: "20px",
  },
};
