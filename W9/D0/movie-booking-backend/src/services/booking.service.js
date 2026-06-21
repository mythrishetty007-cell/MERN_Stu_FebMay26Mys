// src/services/booking.service.js


const Booking = require("../models/Booking");
const Show = require("../models/Show");
const CustomError = require("../utils/customError");


/*
-----------------------------------------
CREATE BOOKING
-----------------------------------------
*/
exports.createBooking = async (userId, { showId, selectedSeats }) => {
  /*
  -----------------------------------------
  VALIDATE SHOW
  -----------------------------------------
  */


  const show = await Show.findById(showId);


  if (!show) {
    throw new CustomError("Show not found", 404);
  }


  /*
  -----------------------------------------
  VALIDATE SEATS
  -----------------------------------------
  */


  const unavailableSeats = [];


  for (const seatNumber of selectedSeats) {
    const seat = show.seats.find((seat) => seat.seatNumber === seatNumber);


    if (!seat || seat.isBooked) {
      unavailableSeats.push(seatNumber);
    }
  }


  if (unavailableSeats.length > 0) {
    throw new CustomError(
      `Seats unavailable: ${unavailableSeats.join(", ")}`,
      400,
    );
  }


  /*
  -----------------------------------------
  BOOK SEATS
  -----------------------------------------
  */


  show.seats.forEach((seat) => {
    if (selectedSeats.includes(seat.seatNumber)) {
      seat.isBooked = true;
    }
  });


  show.availableSeats -= selectedSeats.length;


  await show.save();


  /*
  -----------------------------------------
  CREATE BOOKING
  -----------------------------------------
  */


  const booking = await Booking.create({
    userId,
    showId,
    seats: selectedSeats,
    totalSeats: selectedSeats.length,
    status: "booked",
  });


  return booking;
};


/*
-----------------------------------------
GET USER BOOKINGS
-----------------------------------------
*/
exports.getUserBookings = async (userId) => {
  return await Booking.find({
    userId,
  })
    .populate({
      path: "showId",
      populate: {
        path: "movieId",
      },
    })
    .sort("-createdAt");
};


/*
-----------------------------------------
GET ALL BOOKINGS (ADMIN)
-----------------------------------------
*/
exports.getAllBookings = async () => {
  return await Booking.find()
    .populate("userId", "name email role")
    .populate({
      path: "showId",
      populate: {
        path: "movieId",
      },
    })
    .sort("-createdAt");
};


/*
-----------------------------------------
CANCEL BOOKING
-----------------------------------------
*/
exports.cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId);


  if (!booking) {
    throw new CustomError("Booking not found", 404);
  }


  /*
  -----------------------------------------
  OWNERSHIP CHECK
  -----------------------------------------
  */


  if (booking.userId.toString() !== userId) {
    throw new CustomError("Unauthorized cancellation", 403);
  }


  if (booking.status === "cancelled") {
    throw new CustomError("Booking already cancelled", 400);
  }


  /*
  -----------------------------------------
  RESTORE SEATS
  -----------------------------------------
  */


  const show = await Show.findById(booking.showId);


  if (!show) {
    throw new CustomError("Show not found", 404);
  }


  show.seats.forEach((seat) => {
    if (booking.seats.includes(seat.seatNumber)) {
      seat.isBooked = false;
    }
  });


  show.availableSeats += booking.seats.length;


  await show.save();


  /*
  -----------------------------------------
  UPDATE BOOKING
  -----------------------------------------
  */


  booking.status = "cancelled";


  await booking.save();


  return booking;
};
