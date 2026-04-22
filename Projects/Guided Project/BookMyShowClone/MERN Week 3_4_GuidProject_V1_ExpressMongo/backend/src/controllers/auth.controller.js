const authService = require("../services/auth.service");

//Register
exports.register = async(req,res,next)=>{
    try{
        const result = await authService.registerUser(req.body);

        res.status(201).json({
            success:true,
            message:"User registed. OTP sent.",
            data:result,
        });
    }
    catch(error){
        next(error);
    }
};

//Veriy otp
exports.verifyOTP = async(req,res,next)=>{
    try{
        await authService.verifyOTP(req.body);

        res.status(200).json({
            success:true,
            message:"OTP verified successfully",
        });
    }
    catch(error){
        next(error);
    }
};

//Login
exports.login = async(req,res,next) => {
    try{
        const result = await authService.loginUser(req.body);

        res.status(200).json({
            success:true,
            message:"Login Successful",
            data:result,
        });
    }
    catch(error){
        next(error);
    }
};