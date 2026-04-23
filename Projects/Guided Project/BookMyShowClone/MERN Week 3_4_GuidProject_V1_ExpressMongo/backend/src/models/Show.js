const mongoose = require("mongoose");
// Sub schema
const seatSchema = new mongoose.Schema({
    seatNumber:{
        type:String,
        required:true,
    },
    isBooked:{
        type:Boolean,
        default:false,
    },
},{_id:false});

const showSchema = new mongoose.Schema({
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true,
        index:true,
    },
    date:{
        type:Date,
        required:true,
        index:true,
    },
    time:{
        type:String,
        required:true,
    },
    totalSeats:{
        type:Number,
        required:true,
    },
    availableSeats:{
        type:Number,
        required:true,
    },
    seats:{
        type:[seatSchema],
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
},
{
    timestamps:true,
});

//Compound index:
showSchema.index({movieId:1,date:1});

//Add Validation
// showSchema.pre("save",function(next){
//     if (this.availableSeats>this.totalSeats) {
//         return next(new Error("Available seats cannot exceed total seats"));
//     }
//     next();
// });
// New Add Validation code
showSchema.pre("save", async function () {
    if (this.availableSeats > this.totalSeats) {
        throw new Error("Available seats cannot exceed total seats");
    }
});
module.exports = mongoose.model("Show",showSchema);