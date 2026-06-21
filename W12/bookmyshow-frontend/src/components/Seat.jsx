// src/components/Seat.jsx


export default function Seat({ seat, isSelected, onSelect }) {
    const isBooked = seat.isBooked;


    function handleClick() {
        if (isBooked) return;

        onSelect(seat.seatNumber);
    }


    return (
        <button
            onClick={handleClick}
            disabled={isBooked}
            style={{
                ...styles.seat,

                ...(isBooked && styles.booked),

                ...(isSelected && styles.selected),
            }}
        >
            {seat.seatNumber}
        </button>
    );
}


const styles = {
    seat: {
        width: "50px",
        height: "50px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        cursor: "pointer",
        backgroundColor: "#ffffff",
    },


    booked: {
        backgroundColor: "#d32f2f",

        color: "#ffffff",

        cursor: "not-allowed",
    },


    selected: {
        backgroundColor: "#2e7d32",
        color: "#ffffff",
    },
};
