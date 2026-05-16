const jwt = require('jsonwebtoken');
const AppError = require('../utils/customError');
const users = require('../data/users');

const JWT_SECRET = 'your_jwt_secret_key_here'; // Hardcoded for this mockup

const authMiddleware = (req, res, next) => {
  let token;
  
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Missing JWT', 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return next(new AppError('Invalid token: User not found', 401));
    }
    
    req.user = user;
    next();
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
};

module.exports = { authMiddleware, JWT_SECRET };
