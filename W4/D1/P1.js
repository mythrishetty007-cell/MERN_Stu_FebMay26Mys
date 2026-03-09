// // try catch basics
//  const error = document.getElementById("error");
// // ReferenceError
// try{
//     console.log("Trying to access undefined variable");
//     console.log(notDefined);}
// catch(err){
//     console.log("Error caught",err.name,"-",err.meassage);
//     // error.innerHTML("1 Error caught");
//     error.textContent("2 Error caught");
// }
// console.log("Program execution continues");

// JSON Paring error
// let jsonText = "{json}";
// try{
//     let data = JSON.parse(jsonText);
//     console.log(data);
// }
// catch(err){
//     console.log("JSON parse error: ",err.message);
// }


try{
    let num = 10;
    num();
}
catch(err){
    console.log("Caught error: ",err.name);
}