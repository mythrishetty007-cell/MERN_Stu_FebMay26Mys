//File upload using Multer:with file type,file size restrictions
const express = require("express");
const multer = require("multer");

async function main(){
    try{
        const app = express();
        //mimetype:format of file
         const fileFilter = (req,file,callback)=>{
             if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
                callback(null,true);
             }
             else{
             callback(new Error("Only PNG and JPEG images are allowed."),false);
         }
        };

         //Approach 1: Using dest:
         const uploadWithDest = multer({
            dest:"uploads/",
            limits:{fileSize:1024 * 1024 * 2}, //2MB
            fileFilter
         });

         app.post("/upload-dest",uploadWithDest.single("file"),(req,res)=>{
            res.send({
                messaage:"Uploaded using dest approach",
                note:"Fiename is random,no extention preserved",
                file:req.file
            });
         });

        //  Approach 2 using diskStorage:
        const storage = multer.diskStorage({
            // Where to store the file?
            destination:(req,res,callback)=>{
                callback(null,"uploads/");
            },
            // How to name the file
            filename:(req,file,callback)=>{
                callback(null,Date.now()+"-"+file.originalname);
            }
        });
        const uploadWithDisk = multer({
            storage,
            limits:{fileSize:1024 * 1024 * 2}, //2MB
            fileFilter
        });
        
        app.post("/upload-disk",uploadWithDisk.single("file"),(req,res)=>{
            res.send({
                messaage:"Uploaded using dest approach",
                note:"Fiename is controlled and extention is preserved",
                file:req.file
            });
         });

         app.listen(3000,()=>{
            console.log("Server started on port http://localhost:3000");
            console.log("POST /upload-dest");
         })
    }
    catch(error){
        console.log("Error:",error.message);
    }
}
main();