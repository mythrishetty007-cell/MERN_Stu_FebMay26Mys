// Immediately Invoked Function Expression (IIFE)
// Without parameters
(function(){  //definition 
    console.log("Basic IIFE executed Immediately");
})();
// With parameters
(function(appName, version){  
    console.log("App:",appName,"Version:",version);
})("NodeJs","V22.22.0");
// With return value
const result = (function(){
    const a = 10; b = 20;
    return a+b;
})();
console.log("Sum is:",result);