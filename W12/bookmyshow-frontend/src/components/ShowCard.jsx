/*
=========================================================
SPRINT 4 – SHOW CARD


TOPICS COVERED


✓ Reusable Components
✓ Props
✓ Event Handling


=========================================================
*/


export default function ShowCard({ show, onBook }) {
  return (
    <article style={styles.card}>
      <p>
        <strong>Date:</strong> {new Date(show.date).toLocaleDateString()}
      </p>


      <p>
        <strong>Time:</strong> {show.time}
      </p>


      <p>
        <strong>Available Seats:</strong> {show.availableSeats}
      </p>


      <button onClick={() => onBook(show)} style={styles.button}>
        Book Tickets
      </button>
    </article>
  );
}


const styles = {
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
  },


  button: {
    marginTop: "15px",
    padding: "10px 15px",
    cursor: "pointer",
  },
};
