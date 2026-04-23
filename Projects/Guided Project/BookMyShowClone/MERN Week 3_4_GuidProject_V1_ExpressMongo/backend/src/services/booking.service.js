const Booking = require("../models/Booking");
const Show = require("../models/Show");

// Create Booking
exports.createBooking = async (userId,{showId,seats}) => {
    // 1. Get show
    const show = await Show.findById(showId);

    if (!show) {
        throw new Error("Show not found");
    }

    // 2. validate seats
    const selectedSeats = show.seats.filter((seat)=>
        seats.includes(seat.seatNumber));
    if (selectedSeats.length!=seats.length) {
       throw new Error("seats do not exist");        
    }

    // 3. Check if already booked
    for(let seat of selectedSeats){
        if (seat.isBooked) {
            throw new Error(`Seat ${seat.seatNumber} is already booked`);
        }
    }

    // 4. Mark seats as booked
    show.seats = show.seats.map((seat)=>{
        if (seats.includes(seat.seatNumber)) {
            seat.isBooked = true;
        }
        return seat;
    });
    // 5. Update available seats
    show.availableSeats -=seats.length;

    await show.save();

    // 6. Create booking
    const booking = await Booking.create({
        userId, showId, seats, totalSeats: seats.length,
    });
    return booking;
};

// Get user bookings
exports.getUserBookings = async (userId) => {
    const bookings = await Booking.find({
        userId,
        status:"booked",
    })
    .populate({
        path:"showId",
        select:"date time availableSeats movieId",
        populate:{
            path: "movieId",
            select:"title genre",
        },
    })
    .sort("-createdAt");

    //Transform response
    return bookings.map((booking)=>({
        bookingId:booking._id,
        seats:booking.seats,
        totalSeats:booking.totalSeats,
        status:booking.status,
        bookingTime:booking.bookingTime,

        show:{
            id:booking.showId._id,
            date:booking.showId.date,
            time:booking.showId.time,
            availableSeats:booking.showId.availableSeats,
        },
        movie:{
            id:booking.showId.movieId._id,
            title:booking.showId.movieId.title,
            genre:booking.showId.movieId.genre,
        },
    }));
};

// Cancel booking
exports.cancelBooking = async (bookingId,userId) => {
    const booking = await Booking.findById(bookingId);
    if(!booking)
        throw new Error("Booking not found");

    if (booking.userId.toString()!==userId.toString()) {
        throw new Error("Unauthorized");
    }

    if(booking.status === "cancelled"){
        throw new Error("Already cancelled.");
    }

    // 1.get show
    const show = await Show.findById(booking.showId);
    // 2. Release seats
    show.seats = show.seats.map((seat)=>{
        if (booking.seats.includes(seat.seatNumber)) {
            seat.isBooked = false;
        }
        return seat;
    });
    // 3. Update available seats
    show.availableSeats +=booking.seats.length;
    await show.save();

    // 4. Update booking
    booking.status = "cancelled";
    await booking.save();    
};