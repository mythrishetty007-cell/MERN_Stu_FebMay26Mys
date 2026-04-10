// Applied filters to the query using comparsion operators 
const mongoose = require("mongoose");

async function runFilterDemo(){
    try{
        await mongoose.connect("mongodb://localhost:27017/merntraining");
        console.log("MongoDB connected successfully");

        const productSchema = new mongoose.Schema({
            name:String,
            price:Number,
            category:String,
            status:String
        });

        const Product = mongoose.models.Product || mongoose.model("Product",productSchema); 

        await Product.create([
            {name: "Book",
            price: 60,
            category: "Stationary",
            status:"active"},
            {name: "Pen",
            price: 5,
            category: "Stationary",
            status:"inactive"},
            {name: "Laptop",
            price: 50000,
            category: "Electronics",
            status:"active"},
            {name: "Phone",
            price: 30000,
            category: "Electronics",
            status:"active"},
            {name: "CD",
            price: 50,
            category: "Electronics",
            status:"inactive"}
        ]);

        const equalQuery = await Product.find({status:{$eq:"active"}});
        // console.log("Products which are active:",equalQuery);

        const greaterQuery = await Product.find({price:{$gt:5000}});
        console.log("Products which are priced more than 5k:",greaterQuery);

        const lesserQuery = await Product.find({price:{$lt:5000}});
        console.log("Products which are priced less than 5k:",lesserQuery);

        await mongoose.connection.close();
        console.log("connection closed");
    }
    catch(error){
        console.log("Filter demo error:",error.message);
    }
}    
runFilterDemo();