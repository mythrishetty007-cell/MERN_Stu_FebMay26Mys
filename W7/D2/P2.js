// Third-party middleware are available @ npm registry
const express = require("express");
// Middleware to log all the requests
const morgan = require("morgan");

const cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors()); //it can be used in production

app.get("/",function(req,res){
    res.json({
        message: "Third-party middleware executed before this response"
    });
});

app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});