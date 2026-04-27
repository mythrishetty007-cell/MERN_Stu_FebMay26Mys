const User = require("../models/User");
const OTP = require("../models/OTP");
const otpService = require("./otp.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
/*
-----------------------------------------
REGISTER USER
-----------------------------------------
*/
exports.registerUser = async ({ name, email, password }) => {
const existingUser = await User.findOne({ email });
if (existingUser) {
throw new CustomError("User already exists",409);
}
const user = await User.create({
name,
email,
password,
});
await otpService.generateOTP(email);
return { email: user.email };
};
/*
-----------------------------------------
VERIFY OTP
-----------------------------------------
*/
exports.verifyOTP = async ({ email, otp }) => {
const record = await OTP.findOne({ email }).select("+otp");
if (!record) {
throw new CustomError("OTP expired or not found",410);
}
const isMatch = await bcrypt.compare(otp, record.otp);
if (!isMatch) {
record.attempts += 1;
await record.save();

throw new CustomError("Invalid OTP",400);
}
await User.updateOne({ email }, { isVerified: true });
return true;
};
/*
-----------------------------------------
LOGIN USER
-----------------------------------------
*/
exports.loginUser = async ({ email, password }) => {
const user = await User.findOne({ email }).select("+password");
if (!user) {
throw new CustomError("User not found",400);
}
if (!user.isVerified) {
throw new CustomError("User not verified",403);
}
const isMatch = await user.comparePassword(password);
if (!isMatch) {
throw new CustomError("Invalid credentials",401);
}
const token = jwt.sign(
{ id: user._id, role: user.role },
process.env.JWT_SECRET,
{ expiresIn: "1d" }
);
return {
token,
user: {
id: user._id,
role: user.role,
},
};
};