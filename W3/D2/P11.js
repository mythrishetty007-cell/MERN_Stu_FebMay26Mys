//Recursive function
// a function which calls itself
function factorial(n){
    if(n<=1){
        let n = 7;
        return 1;
    }
    return n*factorial(n-1);
}
console.log("factorial is",factorial(3));