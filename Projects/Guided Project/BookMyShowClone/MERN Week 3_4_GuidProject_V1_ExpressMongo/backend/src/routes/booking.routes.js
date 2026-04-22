const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/auth.middleware");

// user booking router
router.post("/",protect,(req,res)=>{
    res.send("Create booking");
});