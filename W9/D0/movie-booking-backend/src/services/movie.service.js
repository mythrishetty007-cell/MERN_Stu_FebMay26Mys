// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\services\movie.service.js
const Movie = require("../models/Movie");
const CustomError = require("../utils/customError");
/*
-----------------------------------------
CREATE MOVIE
-----------------------------------------
*/
exports.createMovie = async (data) => {
  return await Movie.create(data);
};


/*
-----------------------------------------
GET MOVIES
-----------------------------------------
*/
exports.getMovies = async (query) => {
  let { page = 1, limit = 5, genre, rating, search, sort } = query;


  page = Number(page);
  limit = Number(limit);


  const filter = { isActive: true };


  if (genre) {
    filter.genre = genre;
  }


  if (rating) {
    filter.rating = { $gte: Number(rating) };
  }


  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }


  let mongoQuery = Movie.find(filter);


  if (sort) {
    mongoQuery = mongoQuery.sort(sort);
  } else {
    mongoQuery = mongoQuery.sort("-createdAt");
  }


  const skip = (page - 1) * limit;


  mongoQuery = mongoQuery.skip(skip).limit(limit);


  const movies = await mongoQuery;
  const total = await Movie.countDocuments(filter);


  return {
    movies,
    pagination: {
      page,
      limit,
      total,
    },
  };
};


/*
-----------------------------------------
GET MOVIE BY ID
-----------------------------------------
*/
exports.getMovieById = async (id) => {
  const movie = await Movie.findOne({
    _id: id,
    isActive: true,
  });


  if (!movie) {
    throw new CustomError("Movie not found", 404);
  }


  return movie;
};


/*
-----------------------------------------
UPDATE MOVIE
-----------------------------------------
*/
exports.updateMovie = async (id, data) => {
  const movie = await Movie.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });


  if (!movie) throw new CustomError("Movie not found", 404);


  return movie;
};


/*
-----------------------------------------
DELETE MOVIE
-----------------------------------------
*/
exports.deleteMovie = async (id) => {
  const movie = await Movie.findByIdAndUpdate(id, {
    isActive: false,
  });


  if (!movie) throw new CustomError("Movie not found", 404);
};
