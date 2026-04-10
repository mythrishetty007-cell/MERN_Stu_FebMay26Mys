// CRUD operations in MongoDB using Mongoose
const mongoose = require("mongoose");
async function runCrudDemo(){
    try{
        await mongoose.connect("mongodb://localhost:27017/abcmern");
        console.log("MongoDB connected successfully");

        const studentSchema = new mongoose.Schema({
            name: String,
            age: Number,
            role: String
        });
        
        const Student = mongoose.models.Student || mongoose.model("Student",studentSchema); 
        // Clearing previous demo data
        await Student.deleteMany({role:"demo-student"});

        // Create using save()
        const firstStudent = new Student({
            name: "Mythri",
            age: 22,
            role: "demo-student"
        });
        await firstStudent.save();
        // console.log("Created new student with save()",firstStudent);

        // Create using create()
        const secondStudent = await Student.create({
            name: "Shanthala",
            age: 20,
            role: "demo-student"
        });
        // console.log("Created new student with create()",secondStudent);
        
        // Read using find()
        const allDemoStudents = await Student.find({role:"demo-student"});
        // console.log("Read with find(): ",allDemoStudents);

        // Read using findOne()
        const oneDemoStudent = await Student.findOne({name:"Shanthala"});
        // console.log("Read with findOne(): ",oneDemoStudent);

        // Update using findByIdAndUpdate()
        const updatedStudent = await Student.findByIdAndUpdate(
            secondStudent._id,
            {age:22},
            {new:true}
        );
        console.log("Updates with findByIdAndUpdate():",updatedStudent); 

        // Delete using findByIdAndDelete()
        const deletedStudent = await Student.findByIdAndDelete(firstStudent._id);
        // console.log("Deleted with findByIdAndDelete():",deletedStudent);

        await mongoose.connection.close();
        console.log("connection closed");
    }   
    catch(error){
        console.log("Crud demo error:",error.message);
    }
}     
runCrudDemo();