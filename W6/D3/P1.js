// Introduction to the NodeJS File System (fs) built-in module

const fs = require("fs");
const fsPromises = require("fs/promises");
// callback
console.log("Type of fs.readFile: ",typeof fs.readFile);
console.log("Type of fs.writeFile: ",typeof fs.writeFile);
//fs/Promises
console.log("Type of fsPromises.readFile: ",typeof fsPromises.readFile);
console.log("Type of fsPromises.writeFile: ",typeof fsPromises.writeFile);