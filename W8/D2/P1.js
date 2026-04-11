// Virtual fields in Mongoose
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
            firstName: String,
            lastName: String,
            email: String
        },
        {
            //This allows virtuals to appear when converting documents 
            // to JSON or objects
            toJSON:{virtuals:true},
            toObject:{virtuals:true}
        }
    );

    // A virtual field is not stored on MongoDB
    // It is computed dynamically from existing stored fields 
    userSchema.virtual("fullname").get(function(){
        return this.firstName + this.lastName;
    });

    const User = mongoose.model("VirtualUser",userSchema);

    const user = new User({
        firstName: "Mythri",
        lastName: "Ramesh",
        email: "m@m.com"
    });

    console.log("Hello, ",user.fullname);
    console.log("Object output includes virtual ",user.toObject());