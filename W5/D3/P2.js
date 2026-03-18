//Why use async/await
function getUser(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve({id:101,name:"Kiran"});
        },1000);
    });
}

function getOrders(userId){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(["order-A","order-B"]);
        },1200);
    });
}

async function showUserAndOrders(){
    const user = await getUser();
    console.log("User loaded: ",user.name); //if id needed to display means add .id for user

    const orders = await getOrders(user.id);
    console.log("Orders loaded",orders);
} 
showUserAndOrders();