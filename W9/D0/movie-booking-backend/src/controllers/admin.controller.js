// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\controllers\admin.controller.js
const Movie = require("../models/Movie");
const Show = require("../models/Show");
const Booking = require("../models/Booking");
const User = require("../models/User");


/*
-----------------------------------------
DASHBOARD STATS
-----------------------------------------
*/


exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalMovies = await Movie.countDocuments({
      isActive: true,
    });


    const totalShows = await Show.countDocuments({
      isActive: true,
    });


    const totalBookings = await Booking.countDocuments();


    const totalUsers = await User.countDocuments();


    res.status(200).json({
      success: true,
      data: {
        totalMovies,
        totalShows,
        totalBookings,
        totalUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};
