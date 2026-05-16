const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/authMiddleware');
const users = require('../data/users');
const AppError = require('../utils/customError');

const login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError('Missing username or password', 400));
  }
  
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }
  
  // Generate JWT
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  
  // Set Cookie
  res.cookie('token', token, {
    httpOnly: true,
    // secure: true // would be required for https in prod
  });
  
  // Set session variables to demonstrate stateful vs stateless
  if(req.session) {
      req.session.userId = user.id;
      req.session.role = user.role;
  }
  
  res.status(200).json({ message: 'Login successful', token, user: { id: user.id, username: user.username, role: user.role } });
};

module.exports = { login };
