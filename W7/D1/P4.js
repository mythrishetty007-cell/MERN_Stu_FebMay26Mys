// Middleware usage in Express
// Middleware runs during the request-response cycle
// Middleware can inspect or change the request before 
// a route responds
// next() passes control to the next step
const express =  require("express");

const app = express();

// app.use registers middleware.
// This middleware runs for every incoming request.
app.use(function(req,res,next){
    console.log("Request received",req.method,res.url);
    // next() is required when this middleware does not finish the response
    next();
});

app.get("/",function(req,res){
    res.send("Middleware executed before the route.");
});

app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});