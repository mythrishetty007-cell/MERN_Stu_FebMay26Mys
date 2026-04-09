//cancel.js
// To cancel the existing booking if exists
const bookingEmitter = require("./events");
const {getCurrentBooking,clearCurrentBooking} = require("./booking");
const { appendLogAsync } = require("./fileManager"); //New

async function cancelBooking(movies) { //New
    const booking = getCurrentBooking();

    if (!booking) {
        bookingEmitter.emit("bookingFailed","No booking found to cancel.");
        return null;
    }

    const movie = movies.find((m)=>m.id === booking.movieId);
    if (!movie) {
        bookingEmitter.emit("bookingFailed","Movie data not found while cancelling booking.");
        return null;
    }

    const showtime = movie.showtimes.find((show)=>show.time.toLowerCase()===booking.time.toLowerCase());
    if (!showtime) {
        bookingEmitter.emit("bookingFailed","Showtime data not found");
        return null;
    }

    //restore seats
    showtime.seatsAvailable +=booking.seatCount;

    // clear current Booking
    clearCurrentBooking();

    await appendLogAsync(`Booking cancelled: ${booking.bookingId} for ${booking.movieTitle}`); //New
    bookingEmitter.emit("bookingCancelled",booking);

    return booking;
}

module.exports = {
    cancelBooking
};