//Date fundamentals
const mongoose = require("mongoose");
const { log } = require("node:console");

async function main(){
    try{
        await mongoose.connect('mongodb://localhost:27017/datedb');
        console.log("Connected to MongoDB");
        const schema = new mongoose.Schema({
            name:String,
            createdAt:{
                type:Date,
                default:Date.now
            }
        });
        const Model = mongoose.model('DateFund',schema);
        await Model.deleteMany();
        
        const doc = await Model.create({
            name:"Test"
        });
        console.log("Document:",doc);
    }
    catch(err){
        console.error("Error:",err.message);   
    }
    finally{
        await mongoose.disconnect();
        console.log("DB disconnected");
    }
}
main();