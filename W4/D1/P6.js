// // finally
// function example(){
//     try{
//         console.log("Example in try block");
//         return "TRY_RETURN";
//     }
//     finally{
//         console.log("This is printed!");
//     }
// }
// console.log("Example result: ",example());

// return in catch block and still not finally
function example1(){
    try{
        try{
            throw new Error("New error");
        }
        catch(e){
            console.log("Example 1: caught error");
            // return 10;
            throw(e);
        }
        finally{
            console.log("Example 1: finally still runs"); 
        }
    }
    catch(e){
        console.log("Example 1 outer catch",e.message);
    }
}
console.log("Example 1: ",example1());