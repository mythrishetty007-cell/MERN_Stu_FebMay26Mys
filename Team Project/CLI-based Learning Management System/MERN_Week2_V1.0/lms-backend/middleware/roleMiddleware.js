const AppError = require('../utils/customError');

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Unauthorized', 401));
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('Invalid role access', 403));
    }
    
    next();
  };
};

module.exports = roleMiddleware;
