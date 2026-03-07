const btn = document.getElementById("compareBtn");

btn.addEventListener("click",function(e){
    console.log("Regular function");
    console.log("this === btn",this===btn);   
    console.log("e current target === btn",e.currentTarget===btn);
    console.log("e.target === btn",e.target === btn); 
});

btn.addEventListener("click",(e) =>{
    console.log("Arrow function");
    console.log("this === btn",this===btn);
    console.log("e current target === btn",e.currentTarget===btn);
    console.log("e.target === btn",e.target === btn); 
});