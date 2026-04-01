// Custom error classes
const express=require("express");
const app=express();
// custom error class
class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}
app.get("/product",function(req,res,next){
    next(new AppError("Product not found"),404);
});
app.get("/search",function(req,res,next){
    if (!req.query.q) {
        return next(new AppError("Search query is required"),404);  
    }
    res.json({
        success:true,
        query:req.query.q
    });
});
//centralized error handling middleware
app.use(function(error,req,res,next){
    res.status(error.statusCode || 404).json({
        success:false,
        message:error.message,
        statusCode:error.statusCode || 500
    });
});
app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});
// http://localhost:4000/search?q=iphone