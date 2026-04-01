// Generating token using login function and verifying the token
const jwt = require("jsonwebtoken");

const secretKey = "monkey123";

const wrongSecretKey = "manga123";

function loginUser(email,password){
    if(email === "correct@email.com" && password === "mp123"){
        const token = jwt.sign(
            {
                userId:101,
                email:email,
                role:"student"
            },secretKey,{expiresIn:"1h"});
        return{
            success:true,
            token:token
        };    
    }
    return{
            success:false,
            message:"Invalid Credentials"
    }; 
}
const loginResult = loginUser("correct@email.com","mp123");
console.log("login result",loginResult);

if(loginResult.success){
    try{
        const verifiedPayload = jwt.verify(loginResult.token,secretKey);
        console.log("Verified Payload: ",verifiedPayload);
    }
    catch(error){
    console.log("verification failed",error.message);
    }
}