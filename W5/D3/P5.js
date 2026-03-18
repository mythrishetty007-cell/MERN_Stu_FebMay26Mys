// An async function always returns a Promise
async function getStatusMeassge(){
    return "Order is ready";
}
const result = getStatusMeassge();

console.log("Is this returned value a promise?",result instanceof Promise);

result.then(function(message){
    console.log("Resolved value:",message);
});