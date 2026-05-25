const AppError = require('../utils/appError');

const errorHandler = (err, req, res, next) => {
  console.error('ERROR:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ success: false, error: messages.join(', ') });
  }

  if (err.code === 11000) {
    return res.status(400).json({ success: false, error: 'Duplicate field value' });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: `Invalid ${err.path}: ${err.value}` });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }

  res.status(500).json({ success: false, error: 'Server Error' });
};

module.exports = errorHandler;