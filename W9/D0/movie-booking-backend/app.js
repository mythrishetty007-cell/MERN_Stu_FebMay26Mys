// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\app.js


/*
=========================================================
APP CONFIGURATION


TOPICS COVERED:


✓ Express Application Setup
✓ Middleware Ordering
✓ CORS Configuration
✓ Request Logging
✓ Route Registration
✓ Global Error Handling


WHY THIS FILE?


This file wires together the entire
backend application.


Request
↓
CORS
↓
Logging
↓
JSON Parsing
↓
Routes
↓
Error Handling


=========================================================
*/


// Import express
const express = require("express");
const cors = require("cors");


const authRoutes = require("./src/routes/auth.routes");
const movieRoutes = require("./src/routes/movie.routes");
const bookingRoutes = require("./src/routes/booking.routes");
const showRoutes = require("./src/routes/show.routes");
const adminRoutes = require("./src/routes/admin.routes");


const morgan = require("morgan");


const errorMiddleware = require("./src/middleware/error.middleware");


// Initialize app
const app = express();


/*
-----------------------------------------
MIDDLEWARE CONFIGURATION
-----------------------------------------
*/


/*
CORS Middleware


WHY?


Frontend:
http://localhost:5173


Backend:
http://localhost:5000


Different origins require explicit
permission from the backend.
*/


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);


/*
Morgan Logging Middleware


Logs all incoming requests.
Useful during development.
*/


app.use(morgan("dev"));


/*
Built-in middleware to parse JSON.
*/


app.use(express.json());


/*
-----------------------------------------
API ROUTES
-----------------------------------------
*/


app.use("/api/auth", authRoutes);

app.use("/api/movies", movieRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/shows", showRoutes);

app.use("/api/admin", adminRoutes);


/*
-----------------------------------------
BASIC ROUTES
-----------------------------------------
*/


// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Movie Booking API is running...",
  });
});


/*
-----------------------------------------
GLOBAL ERROR HANDLER


Must be registered AFTER routes.
-----------------------------------------
*/


app.use(errorMiddleware);


/*
-----------------------------------------
EXPORT APP
-----------------------------------------
*/


module.exports = app;


/*
=========================================================
REQUEST FLOW


Incoming Request
↓
CORS Check
↓
Morgan Logging
↓
JSON Parsing
↓
Route Matching
↓
Controller Logic
↓
Error Handler (if needed)
↓
Response


=========================================================


KEY TAKEAWAYS


1. CORS must come before routes.


2. Error middleware must come last.


3. Logging middleware is best placed
   before routes.


4. Middleware order matters in Express.


=========================================================
*/
