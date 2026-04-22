const movieService =  require("../services/movie.service");

// Create Movie
exports.createMovie = async (req,res,next) => {
    try{
        const movie = await movieService.createMovie(req.body);

        res.status(201).json({
            success:true,
            message:"Movie created successfully",
            data:movie,
        });
    }
    catch(error){
        next(error);
    }
};

// Get Movies
exports.getMovies = async (req,res,next) => {
    try{
        const result = await movieService.getMovies(req.query);

        res.status(200).json({
            success:true,
            message:"Movie List fetched",
            data:result,
        });
    }
    catch(error){
        next(error);
    }
};

// Update Movie
exports.updateMovie = async (req,res,next) => {
    try{
        const movie = await movieService.updateMovie(
            req.params.id,
            req.body);

        res.status(200).json({
            success:true,
            message:"Movie updated successfully",
            data:movie,
        });
    }
    catch(error){
        next(error);
    }
};

// Delete Movie
exports.deleteMovie = async (req,res,next) => {
    try{
        await movieService.deleteMovie(req.params.id);

        res.status(200).json({
            success:true,
            message:"Movie deleted successfully",
        });
    }
    catch(error){
        next(error);
    }
};