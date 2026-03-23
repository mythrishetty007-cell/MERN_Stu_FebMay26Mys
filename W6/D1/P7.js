//Understanding path module and JSON module

const path = require("path");
//JSON is loaded as a normal JS object in CommonJS 
const appConfig = require("./support/app-config.json"); 

console.log("__dirname",__dirname);
console.log("__filename",__filename);

console.log("Application name: ",appConfig.appName);
console.log("Envirnment:",appConfig.environment);
console.log("Features:",appConfig.features.join(", ")); 