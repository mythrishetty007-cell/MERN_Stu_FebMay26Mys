const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Movie title is required"],
        trim:true,
        index:true,
    },
    genre:{
        type:String,
        required:[true,"Genre is required"],
        enum:[
            "Action", "Comedy","Drama","Horror", "Sci-Fi",
             "Romance", "Thriller",
        ],
        index:true,
    },
    rating:
    {
        type:Number,
        required:true,
        min:[1,"Rating must be at least 1"],
        max:[5,"Rating cannot exceed 5"],
        index:true,
    },
    duration:{
        type:Number,
        required:[true,"Duration is required"],
    },
    releaseDate:{
        type:Date,
        required:[true,"Release date is required"],
        index:true,
    },
    poster:{
        type:String,  //url of image
        default:"",
    },
    language:{
        type:String,
        index:true,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
},{
    timestamps:true, 
});

// Compound index
movieSchema.index({genre:1,rating:-1});

// Text index
movieSchema.index({title:"text"});

// Virual field
movieSchema.virtual("isReleased").get(function(){
    return this.releaseDate<=new Date();
});

module.exports = mongoose.model("Movie",movieSchema);