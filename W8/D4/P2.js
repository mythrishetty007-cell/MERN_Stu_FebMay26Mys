// Timestamp and Advanced queries
const mongoose = require('mongoose');

async function main(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/datedb');
        console.log("MongoDB connected");

        const demoSchema = new mongoose.Schema(
            {
                name:String,
            },
            {
                timestamps: true
            }
        );
        const Model = mongoose.model('LogTime',demoSchema);
        
        // await Model.deleteMany();

        //  await Model.create([
        //     {name:"Srihan"},
        //     {name:"Shramith"},
        //     {name:"Rishika"}
        // ]);

        const recent = await Model.find({
            createdAt:{
                $gte: new Date(Date.now()-1500000)
            }
        }).sort({createdAT:-1});
        console.log("Recent: ",recent);
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