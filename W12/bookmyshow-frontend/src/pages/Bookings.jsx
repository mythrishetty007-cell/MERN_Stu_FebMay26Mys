// src/pages/Bookings.jsx


/*
=========================================================
SPRINT 1 – BOOKINGS PAGE


TOPICS COVERED:


✓ Protected Routes
✓ Conditional Rendering
✓ Rendering Lists


WHY THIS COMPONENT?


Bookings represent one of the
most important user journeys.


Sprint 1:


Protected UI Shell


Sprint 5:


Booking APIs
↓
Ticket Cancellation
↓
Booking History
↓
Booking Details


=========================================================
*/


const sampleBookings = [
  {
    id: 1,
    movie: "Interstellar",
    seats: "A1, A2",
    date: "20 July 2026",
  },

  {
    id: 2,
    movie: "Dune",
    seats: "B4",
    date: "22 July 2026",
  },
];


export default function Bookings() {
  return (
    <section>
      <h1>My Bookings</h1>

      <p>View your recent bookings.</p>

      <div style={styles.grid}>
        {sampleBookings.map((booking) => (
          <div key={booking.id} style={styles.card}>
            <h3>{booking.movie}</h3>

            <p>Seats: {booking.seats}</p>

            <p>Date: {booking.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


const styles = {
  grid: {
    marginTop: "30px",
    display: "grid",
    gap: "20px",
  },

  card: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "6px",
  },
};


/*
=========================================================
KEY TAKEAWAYS


1. Protected pages evolve
   progressively.


2. Lists are frequently used
   in dashboards.


3. Sprint 5 transforms this into
   a complete booking experience.


=========================================================
*/