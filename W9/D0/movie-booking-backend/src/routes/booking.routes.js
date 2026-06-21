// src/routes/booking.routes.js


const express = require("express");


const router = express.Router();


const bookingController = require("../controllers/booking.controller");


const { protect } = require("../middleware/auth.middleware");


const { authorize } = require("../middleware/role.middleware");


/*
-----------------------------------------
USER ROUTES
-----------------------------------------
*/


/*
POST /api/bookings


Create a booking.
Accessible only to authenticated users.
*/
router.post(
  "/",
  protect,
  authorize("user"),
  bookingController.createBooking,
);


/*
GET /api/bookings/my


Get current user's bookings.
*/
router.get(
  "/my",
  protect,
  authorize("user"),
  bookingController.getMyBookings,
);


/*
PATCH /api/bookings/:id/cancel


Cancel a booking.
*/
router.patch(
  "/:id/cancel",
  protect,
  authorize("user"),
  bookingController.cancelBooking,
);


/*
-----------------------------------------
ADMIN ROUTES
-----------------------------------------
*/


/*
GET /api/bookings


Get all bookings.
Accessible only to admins.
*/
router.get(
  "/",
  protect,
  authorize("admin"),
  bookingController.getAllBookings,
);


module.exports = router;