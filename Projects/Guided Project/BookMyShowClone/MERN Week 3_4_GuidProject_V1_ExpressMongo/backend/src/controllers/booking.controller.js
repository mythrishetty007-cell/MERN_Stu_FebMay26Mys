const bookingService = require("../services/booking.service");

// Create booking
exports.createBooking = async (req,res,next) => {
    try{
        const booking = await bookingService.createBooking(
            req.user._id,
            req.body
        );
        res.status(201).json({
            success:true,
            message:"Booking confirmed.",
            data:booking,
        });
    }
    catch(error){
        next(error);
    }
};

// Get bookings
exports.getMyBookings = async (req,res,next) => {
    try{
        const bookings = await bookingService.getUserBookings(req.user._id);
        res.status(200).json({
            success:true,
            message:"Bookings fetched.",
            data:bookings,
        });
    }
    catch(error){
        next(error);
    }
};

// Cancel bookings
exports.cancelBooking = async (req,res,next) => {
    try{
        await bookingService.cancelBooking(req.params._id,req.user._id);
        res.status(200).json({
            success:true,
            message:"Bookings cancelled.",
            data:bookings,
        });
    }
    catch(error){
        next(error);
    }
};