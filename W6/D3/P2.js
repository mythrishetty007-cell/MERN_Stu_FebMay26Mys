// Reading & writing files synchronously

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"sync-note.txt");

// Syntax for function usage in a module
// moduleName.functionName()

// fs.writeFileSync(filePath,"This file was written using writeFileSync().\nSynchronous operation block execution.");
//Append to a file
fs.appendFile(filePath,"New text added using fs.appendFile.",
    function(error){
        if(error){
            console.log("Append error: ",error.message);
            return;
        }
        console.log("File content appended");
    }
);

console.log("File written synchronously.");

const content = fs.readFileSync(filePath,"utf-8");

console.log("File read synchronously.");
console.log("File content:\n",content);