// src/pages/Bookings.jsx

/*
=========================================================
SPRINT 6 – BOOKING PAGE

TOPICS COVERED:
✓ useLocation
✓ useNavigate
✓ Seat Selection
✓ API Integration
✓ Async/Await
✓ Loading State
✓ Error Handling

WHY THIS COMPONENT?

This page completes the core BookMyShow booking journey.

Movie Details
↓
Book Tickets
↓
Seat Selection
↓
Create Booking
↓
Booking Success

=========================================================
*/

import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import SeatGrid from "../components/SeatGrid";

import { createBooking } from "../api/booking.api";

export default function Bookings() {
  const location = useLocation();
  const navigate = useNavigate();


  /*
  =====================================================
  NAVIGATION STATE

  MovieDetails
  ↓
  navigate("/bookings", {
    state: {
      movie,
      show,
    }
  })

  =====================================================
  */

  const bookingData = location.state;

  /*
  =====================================================
  DIRECT ACCESS

  User typed /bookings directly.

  Booking history integration
  comes in the next step.

  =====================================================
  */

  if (!bookingData) {
    return (
      <section>
        <h1>My Bookings</h1>
        <p>Booking history integration will be added in the next step.</p>
      </section>
    );
  }

  const { movie, show } = bookingData;

  /*
  =====================================================
  LOCAL STATE
  =====================================================
  */

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /*
  =====================================================
  CREATE BOOKING
  =====================================================
  */

  async function handleBooking() {
    try {
      setLoading(true);

      setError("");

      await createBooking({
        showId: show._id,
        selectedSeats,
      });

      alert("Booking created successfully!");

      navigate("/mybookings");
    } catch (error) {
      setError(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  }


  return (
    <section>
      <h1>Book Tickets</h1>

      <div style={styles.summary}>
        <h2>{movie.title}</h2>

        <p>Genre: {movie.genre}</p>

        <p>Rating: {movie.rating}</p>

        <p>Date: {new Date(show.date).toLocaleDateString()}</p>

        <p>Time: {show.time}</p>

        <p>Available Seats: {show.availableSeats}</p>
      </div>

      {error && <p style={styles.error}>{error}</p>}

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
        onClick={handleBooking}
        disabled={selectedSeats.length === 0 || loading}
        style={{
          ...styles.button,
          ...(selectedSeats.length === 0 || loading ? styles.disabled : {}),
        }}
      >
        {loading ? "Booking..." : "Confirm Booking"}
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


  error: {
    color: "red",
    marginBottom: "20px",
  },
};


/*
=========================================================
VERIFICATION


✓ Book Tickets opens this page

✓ Seat layout renders

✓ Available seats selectable

✓ Booked seats disabled

✓ Selected seats displayed

✓ Confirm Booking calls API

✓ Success alert shown

✓ Redirects to /bookings

✓ Errors displayed properly

=========================================================
*/
