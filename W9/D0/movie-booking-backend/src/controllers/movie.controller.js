//MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\controllers\movie.controller.js
const movieService = require("../services/movie.service");


/*
-----------------------------------------
CREATE MOVIE
-----------------------------------------
*/
exports.createMovie = async (req, res, next) => {
  try {
    const movie = await movieService.createMovie(req.body);


    res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};


/*
-----------------------------------------
GET MOVIES
-----------------------------------------
*/
exports.getMovies = async (req, res, next) => {
  try {
    const result = await movieService.getMovies(req.query);


    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


/*
-----------------------------------------
GET MOVIE BY ID
-----------------------------------------
*/
exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);


    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};


/*
-----------------------------------------
UPDATE MOVIE
-----------------------------------------
*/
exports.updateMovie = async (req, res, next) => {
  try {
    const movie = await movieService.updateMovie(
      req.params.id,
      req.body
    );


    res.status(200).json({
      success: true,
      message: "Movie updated",
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};


/*
-----------------------------------------
DELETE MOVIE
-----------------------------------------
*/
exports.deleteMovie = async (req, res, next) => {
  try {
    await movieService.deleteMovie(req.params.id);


    res.status(200).json({
      success: true,
      message: "Movie deleted",
    });
  } catch (error) {
    next(error);
  }
};
