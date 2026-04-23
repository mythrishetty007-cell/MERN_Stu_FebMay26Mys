const showService = require("../services/show.service");

// Create Show : Admin
exports.createShow = async (req,res,next) => {
    try{
        const show = await showService.createShow(req.body);
        res.status(201).json({
            success:true,
            message:"Show created successfully",
            data:show,
        });
    }
    catch(error){
        next(error);
    }
};

// Get shows
exports.getShows = async (req,res,next) => {
    try{
        const shows = await showService.getShows(req.query);
        res.status(200).json({
            success:true,
            message:"Shows fetched successfully",
            data:shows,
        });
    }
    catch(error){
        next(error);
    }
};

// Get Single show 
exports.getShowById = async (req,res,next) => {
    try{
        const show = await showService.getShowById(req.params.id);
        res.status(200).json({
            success:true,
            message:"Shows fetched successfully",
            data:show,
        });
    }
    catch(error){
        next(error);
    }
};

// Update Show - admin
exports.udpateShow = async (req,res,next) => {
    try{
        const show = await showService.updateShow(req.params.id,req.body);
        res.status(200).json({
            success:true,
            message:"Show updated successfully",
            data:show,
        });
    }
    catch(error){
        next(error);
    }
};

// Delete Show - Soft delete - admin
exports.deleteShow = async (req,res,next) => {
    try{
        await showService.deleteShow(req.params.id);
        res.status(200).json({
            success:true,
            message:"Show deleted successfully",
        });
    }
    catch(error){
        next(error);
    }
};