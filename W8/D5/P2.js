// Multiple file upload using Multer
const express = require("express");
const multer = require("multer");

async function main(){
    try{
        const app = express();
        
        const upload = multer({
            dest:"uploads/"
        });

        app.post("/upload-multiple",(req,res)=>{
            upload.array("files",5)(req,res,(err)=>{
                if(err){
                    if(err instanceof multer.MulterError){
                        if(err.code === "LIMIT_UNEXPECTED_FILE"){
                            return res.status(400).send("Max 5 files allowed");
                        }
                    }
                    return res.status(400).send(err.message);
                }
                res.send({
                    message:"Files uploaded successfully.",
                    count:req.files.length,
                    files:req.files,
                });
            });
        });
        app.listen(3000,()=>{
            console.log("Server started on port http://localhost:3000");
            console.log("POST /upload-dest");
        });
    }
    catch(error){
        console.log("Error:",error.message);
    }    
}
main();