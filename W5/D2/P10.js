// chaining Promises with returned values
 function getBaseAmount(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(1000); //1000 is price
        },500);
    });
 }
 getBaseAmount()
 .then(function(amount){
    console.log("Base amount: ",amount);
    return amount+200;
 })
 .then(function(updatedAmount){
    console.log("Amount after service charge:",updatedAmount);
    return updatedAmount - 100;
 })
 .then(function(finalAmount){
    console.log("Final Amount after discount: ",finalAmount);
 });