// Usage of built-in and third-party modules (third-party created by non-code developers)

// path is a built-in module, so it works without installation
const path = require("path");

const invoicePath = path.join("invoices","2026","invoice_001.txt");
console.log("Built-in module result: ",invoicePath);

// To use third-party package/module
try{
    const_ = require("lodash");
    console.log("Third-party module example");
}
catch(error){
    console.log("Third-party module 'lodash' is not installed.");
}