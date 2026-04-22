const Movie = require("../models/Movie");
const movie = require("../models/Movie");
// Create Movie
exports.createMovie =async(data) => {
    return await Movie.create(data);
};

// Get movies
exports.getMovies = async(query) => {
    let { page = 1, limit = 5, genre, rating, search, sort} = query;

    page = Number(page);
    limit = Number(limit);

    const filter = { isActive: true };

    if(genre){
        filter.genre = genre;
    }
    if(rating){
        filter.rating = { $gte: Number(rating)}; 
    }
    if(search){
        filter.$text = { $search: search};
    }
    let mongoQuery = Movie.find(filter);

    if(sort){
        mongoQuery = mongoQuery.sort(sort);
    }
    else{
        mongoQuery = mongoQuery.sort("-createdAt");
    }
    const skip = (page - 1)*limit;
    mongoQuery = mongoQuery.skip(skip).limit(limit);

    const movies = await mongoQuery; //executes the query
    const total = await Movie.countDocuments(filter);

    return {
        movies,
        pagination:{
            page,
            limit,
            total,
        },
    };
};

// Update movie
exports.updateMovie = async (id,data) => {
    const movie = await Movie.findByIdAndUpdate(id,data,{
        new:true,
        runValidators:true,
    });

    if(!movie)
        throw new Error("Movie not found");
    
    return movie;
};
// Delete Movie 
exports.deleteMovie = async (id) => {
    // Soft delete
     const movie = await Movie.findByIdAndUpdate(id,{
        isActive:false,
    });
    if(!movie)
        throw new Error("Movie not found");
};