const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollRoutes = require('./routes/enrollRoutes');
const progressRoutes = require('./routes/progressRoutes');

const app = express();

// Global Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'supersecretsessionkey',
  resave: false,
  saveUninitialized: false
}));
app.use(loggerMiddleware);

// Routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/', enrollRoutes); 
app.use('/progress', progressRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
