//Callback function
//Is a function which is passed as an argument to another function

function greetUser(name,callback){
    console.log("Hello, ",name);
    callback();
}
greetUser("Mythri",function(){
    console.log("Callback function executed")
});