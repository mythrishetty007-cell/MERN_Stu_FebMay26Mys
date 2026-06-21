// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\routes\movie.routes.js
const express = require("express");
const router = express.Router();


const validate = require("../middleware/validation.middleware");
const { movieSchema } = require("../utils/validationSchemas");


const movieController = require("../controllers/movie.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");


// Example routes


// Public route
router.get("/", movieController.getMovies);




//get movie by Id (NEW)
router.get("/:id", movieController.getMovieById);


// Admin-only route
router.post(
  "/",
  protect,
  authorize("admin"),
  validate(movieSchema),
  movieController.createMovie,
);
router.put("/:id", protect, authorize("admin"), movieController.updateMovie);
router.delete("/:id", protect, authorize("admin"), movieController.deleteMovie);


module.exports = router;
