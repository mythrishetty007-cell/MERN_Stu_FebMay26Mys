// Event object in click
const box = document.getElementById("box");
const insideBtn = document.getElementById("insideBtn");

box.addEventListener("click",function(event){
    console.log("event type",event.type);
    console.log("event target id",event.target.id);
    console.log("event current target id",event.currentTarget.id);
});

insideBtn.addEventListener("click",function(event){
    console.log("event type",event.type);
    console.log("event target id",event.target.id);
    console.log("event current target id",event.currentTarget.id);
});