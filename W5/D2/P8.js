// Introduction to promises
console.log("Program started.");
function getWelcomeMessage(){
    return new Promise(function(resolve){
        setTimeout(() => {
            resolve("Welcome to Promises");
        },10000);
    });
}
const messagePromise = getWelcomeMessage();
console.log("Promise created. Result not ready yet.");
messagePromise.then(function(message){
    console.log(message);
});
console.log("Program continues while the promise is pending.");