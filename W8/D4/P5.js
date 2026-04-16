// Generated and verified OTP
const crypto = require("crypto");

const otpStore = {};

function generateOTP(userId){
    const otp = crypto.randomInt(100000,999999)
                .toString();
    otpStore[userId] = {
        otp,
        expiresAt:Date.now()+1000,
        attempts:0
    };
    console.log("OTP:",otp);
} 
function verifyOTP(userId,enteredOtp){
    const record = otpStore[userId];

    if(!record){
        return "NO OTP";
    }
    if(Date.now()>record.expiresAt) return "Expired";
    if(record.attempts>=3) return "Blocked";

    record.attempts++;
    return record.otp === String(enteredOtp)?"Valid" : "Invalid";
}
generateOTP("user1");

const userEnteredOtp = otpStore["user1"].otp;
setTimeout(() => {
console.log(verifyOTP("user1","123456"));
},1000);