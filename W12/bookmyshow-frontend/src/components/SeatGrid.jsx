// src/components/SeatGrid.jsx


import Seat from "./Seat";


export default function SeatGrid({ seats, selectedSeats, setSelectedSeats }) {
  function toggleSeat(seatNumber) {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }


  return (
    <>
      <div style={styles.legend}>
        <span>⬜ Available</span>


        <span>🟩 Selected</span>


        <span>🟥 Booked</span>
      </div>


      <div style={styles.grid}>
        {seats.map((seat) => (
          <Seat
            key={seat.seatNumber}
            seat={seat}
            isSelected={selectedSeats.includes(seat.seatNumber)}
            onSelect={toggleSeat}
          />
        ))}
      </div>
    </>
  );
}


const styles = {
  legend: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 50px)",
    gap: "10px",
  },
};
