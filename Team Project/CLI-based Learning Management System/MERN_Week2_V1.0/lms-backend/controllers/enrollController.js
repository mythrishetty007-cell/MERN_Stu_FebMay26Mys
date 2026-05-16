const enrollments = require('../data/enrollments');
const courses = require('../data/courses');
const AppError = require('../utils/customError');

const enroll = (req, res, next) => {
  const courseId = parseInt(req.params.courseId);
  if (isNaN(courseId)) {
    return next(new AppError('Invalid course ID', 400));
  }
  
  const courseExists = courses.find(c => c.id === courseId);
  if (!courseExists) {
    return next(new AppError('Course not found', 404));
  }
  
  const existingEnrollment = enrollments.find(e => e.userId === req.user.id && e.courseId === courseId);
  if (existingEnrollment) {
    return next(new AppError('Duplicate enrollment', 400));
  }
  
  const newEnrollment = { userId: req.user.id, courseId: courseId, date: new Date().toISOString() };
  enrollments.push(newEnrollment);
  res.status(201).json({ message: 'Enrolled successfully', enrollment: newEnrollment });
};

const getUserEnrollments = (req, res, next) => {
  const targetUserId = req.params.userId ? parseInt(req.params.userId) : req.user.id;
  
  if (req.user.role !== 'admin' && req.user.id !== targetUserId) {
    return next(new AppError('Forbidden: Can only view own enrollments', 403));
  }
  
  const userEnrollments = enrollments.filter(e => e.userId === targetUserId);
  res.status(200).json(userEnrollments);
};

const withdraw = (req, res, next) => {
  const courseId = parseInt(req.params.courseId);
  const index = enrollments.findIndex(e => e.userId === req.user.id && e.courseId === courseId);
  
  if (index === -1) {
    return next(new AppError('Enrollment not found', 404));
  }
  
  enrollments.splice(index, 1);
  res.status(200).json({ message: 'Withdrawn successfully' });
};

module.exports = { enroll, getUserEnrollments, withdraw };
