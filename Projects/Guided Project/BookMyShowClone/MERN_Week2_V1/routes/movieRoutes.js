// Handles requests related to movie
const express = require("express");
const {authMiddleware} = require("../middleware/authMiddleware");
const {
    getHome,
    getAllMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie
} = require("../controllers/movieController"); 
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router(); 

router.get("/",getHome);  // Sends req to home page
router.get("/movies",getAllMovies); //Sends req to get all movies 
router.get("/movies/:id",getMovieById); //Sends req to get movies based on id

router.post("/movies",authMiddleware,roleMiddleware("admin"),addMovie); //Sends req to create new movie
router.put("/movies/:id",authMiddleware,roleMiddleware("admin"),updateMovie); //Sends req to update movie detail/s
router.delete("/movies/:id",authMiddleware,roleMiddleware("admin"),deleteMovie); //Sends req to delete a movie 

module.exports = router;