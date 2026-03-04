// Function scope
function scope(){
    var insideVar = 10;
    let insideLet = 20;
    const insideConst = 30;
    console.log(insideVar);
    console.log(insideLet);
    console.log(insideConst);
}
scope();
//  console.log(insideVar); //Function scoped
//     console.log(insideLet); //block scoped
//     console.log(insideConst); //block scoped

function varFunctionScoped(){
    if(true){
        var x = 40;
        let y = 50; //block scope (it will work in this block only)
    } 
    console.log("x: ",x);
    console.log("y: ",y);
}
varFunctionScoped();