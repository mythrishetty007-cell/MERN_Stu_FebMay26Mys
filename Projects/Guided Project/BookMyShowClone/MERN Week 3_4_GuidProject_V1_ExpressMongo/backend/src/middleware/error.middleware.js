const logger = require("../utils/logger");
module.exports = (err, req, res, next) => {
console.error("ERROR:", err.message);
let statusCode = err.statusCode || 500;
let message = logger.error(err.message)|| "Internal Server Error";
//err.message || "Internal Server Error";
// Mongoose Validation Error
if (err.name === "ValidationError") {
message = Object.values(err.errors)
.map((val) => val.message)
.join(", ");
statusCode = 400;
}
// Duplicate Key Error
if (err.code === 11000) {
message = "Duplicate field value";
statusCode = 400;
}
res.status(statusCode).json({
success: false,
message,
});
};