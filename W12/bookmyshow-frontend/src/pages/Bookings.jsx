// src/pages/Bookings.jsx


import { useLocation } from "react-router-dom";
import { useState } from "react";


import SeatGrid from "../components/SeatGrid";


export default function Bookings() {
  const location = useLocation();


  /*
  =====================================================
  NAVIGATION STATE


  MovieDetails
  ↓
  navigate("/bookings", {
      state: { movie, show }
  })


  =====================================================
  */


  const bookingData = location.state;


  /*
  =====================================================
  DIRECT ACCESS


  User typed /bookings directly.


  =====================================================
  */


  if (!bookingData) {
    return (
      <section>
        <h1>My Bookings</h1>


        <p>
          Booking history integration will be
          added in the next step.
        </p>
      </section>
    );
  }


  const { movie, show } = bookingData;


  const [selectedSeats, setSelectedSeats] =
    useState([]);


  return (
    <section>
      <h1>Book Tickets</h1>


      <div style={styles.summary}>
        <h2>{movie.title}</h2>

        <p> Genre: {movie.genre}</p>

        <p> Rating: {movie.rating}</p>

        <p> Date:{" "}
          {new Date(show.date).toLocaleDateString()}</p>

        <p> Time: {show.time}</p>

        <p>
          Available Seats:{" "}
          {show.availableSeats}
        </p>
      </div>

      <h2>Select Seats</h2>

      <SeatGrid
        seats={show.seats}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />

      <div style={styles.selection}>
        <h3>Selected Seats</h3>

        {selectedSeats.length === 0 ? (
          <p>No seats selected.</p>
        ) : (
          <p>{selectedSeats.join(", ")}</p>
        )}
      </div>


      <button
        disabled={selectedSeats.length === 0}
        style={{
          ...styles.button,


          ...(selectedSeats.length === 0
            ? styles.disabled
            : {}),
        }}
      >
        Continue Booking
      </button>
    </section>
  );
}


const styles = {
  summary: {
    border: "1px solid #ddd",


    padding: "20px",


    borderRadius: "8px",


    marginBottom: "30px",
  },


  selection: {
    marginTop: "30px",
  },


  button: {
    marginTop: "30px",


    padding: "12px 20px",


    cursor: "pointer",
  },


  disabled: {
    cursor: "not-allowed",


    opacity: 0.5,
  },
};
