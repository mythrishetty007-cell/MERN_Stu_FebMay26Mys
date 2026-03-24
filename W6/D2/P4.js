// Using of EventEmitter class
const EventEmitter = require("events");

// create a new event emitter instance
// This object can publish events and allow listeners
// to subscribe
const orderEmitter = new EventEmitter();

//Register a listener for the "orderPlaced" event. 
// whenever the event is emitted, the function will execute
// once() registers a listener that automatically removes 
// itself after running for the first time.
orderEmitter.once("OrderPlaced",
    function(orderId,customerName,orderValue){
        console.log("Bill amount: ",orderValue);
        console.log("Waiting for restaurant accepted order.",orderId);
    }
);
orderEmitter.on("OrderPlaced",
    function(orderId,customerName){
        console.log("Hello ",customerName);
        console.log("Restaurant accepted order.",orderId);
    }
);
orderEmitter.on("OrderPlaced", 
    function(orderId){
        console.log("Assigning delivery partner.");
    }
);
orderEmitter.on("OrderPlaced",
    function(orderId){
        console.log("Ramesh is delivering your order.",orderId);
    }
);
// Emit the event with extra data
// The listener receives the orderId Value.
orderEmitter.emit("OrderPlaced","ORD-2403001","Mythri",1000);
orderEmitter.emit("OrderPlaced","ORD-2403001","Mythri",1000);