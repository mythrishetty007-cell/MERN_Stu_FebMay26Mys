// Asynchronous approach of Node.js

console.log("Step 1: Script started.");

setTimeout(()=>{
    console.log("Step 3: Delayed callback finished. F1.");
},10000); //1000 mileseconds=1sec

setTimeout(function(){
    console.log("Step 3: Delayed callback finished. F2.");
}, 3000);

console.log("Step 2: Script did not stop while waiting.");