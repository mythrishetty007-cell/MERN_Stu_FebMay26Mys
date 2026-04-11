// Aggregation functions in MongoDB
const mongoose = require("mongoose");
async function runAggregate(){
    try{
        await mongoose.connect("mongodb://localhost:27017/merntraining");
        console.log("MongoDB connected successfully");

        const saleSchema = new mongoose.Schema({
            category:String,
            amount:Number,
            status:String
        });

        const Sale = mongoose.models.Sale || mongoose.model("Sale",saleSchema);

        // await Sale.deleteMany({status:"demo-sale"});

        // await Sale.create([
        //     {category:"books", amount:200, status:"demo-sale"},
        //     {category:"books", amount:300, status:"demo-sale"},
        //     {category:"books", amount:400, status:"demo-sale"},
        //     {category:"stationary", amount:100, status:"demo-sale"},
        //     {category:"stationary", amount:150, status:"demo-sale"},
        //     {category:"stationary", amount:450, status:"demo-sale"}
        // ]);

        const aggregationResult = await Sale.aggregate([
            // $match filters the incoming documents first
            {$match: {status:"demo-sale"}},

            // $group: groups by a specific condition & calculate total & average
            {$group:{
                _id:"$category",
                totalAmount: {$sum:"$amount"},
                averageAmount: {$avg:"$amount"},
                itemCount: {$sum:1}    
            }},
            // $sort orders the grouped output
            {$sort:{totalAmount:-1}}
        ]);
        console.log("Aggregation result: ",aggregationResult);

        await mongoose.connection.close();
        console.log("connection closed");
    }
    catch(error){
        console.log("sort_Pagination demo error:",error.message);
    } 
}

runAggregate();