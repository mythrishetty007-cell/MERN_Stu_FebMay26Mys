// Basics of ExpressJS - setup
// npm init -y
// npm install express

// Import module of Express
const express = require("express");

// calling express() creates the main application object
// This object is used to register routes and middleware
const app = express();

// app.get() handles GET requests for a specific path
app.get("/",function(req,res){
    //res.send() sends a response body and 
    //ends the request automatically 
    res.send("Hello from express server"); 
});

// listen() starts the server on a choosen port number
app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});