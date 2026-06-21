// src/pages/MyBookings.jsx


import { useEffect, useState } from "react";


import BookingCard from "../components/BookingCard";


import { getMyBookings, cancelBooking } from "../api/booking.api";


import LoadingSpinner from "../components/LoadingSpinner";


export default function MyBookings() {
  const [bookings, setBookings] = useState([]);


  const [loading, setLoading] = useState(true);


  const [error, setError] = useState("");


  async function loadBookings() {
    try {
      setLoading(true);


      const response = await getMyBookings();


      setBookings(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadBookings();
  }, []);


  async function handleCancel(bookingId) {
    try {
      await cancelBooking(bookingId);


      await loadBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Cancellation failed");
    }
  }


  if (loading) {
    return <LoadingSpinner />;
  }


  return (
    <section>
      <h1>My Bookings</h1>


      {error && <p style={styles.error}>{error}</p>}


      {bookings.length === 0 && <p>No bookings found.</p>}


      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onCancel={handleCancel}
        />
      ))}
    </section>
  );
}

const styles = {
  error: {
    color: "red",
  },
};
