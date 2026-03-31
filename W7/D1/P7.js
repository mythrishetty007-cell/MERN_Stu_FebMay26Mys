// Built-in Middleware
const express =  require("express");

const app = express();

app.use(express.json());

// express.urlencoded() parses form-style data
// extended: false is a beginner friendly config
app.use(express.urlencoded({extended:false}));

app.post("/api/users",function(req,res){
    res.status(201).json({
        success: true,
        parseBody: req.body
    });
});

app.post("/form",function(req,res){
    res.json({
        success: true,
        formData: req.body
    });
});

app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
});