const progress = require('../data/progress');
const enrollments = require('../data/enrollments');
const AppError = require('../utils/customError');

const markLessonComplete = (req, res, next) => {
  const courseId = parseInt(req.params.courseId);
  const { lessonId } = req.body;
  
  if (isNaN(courseId) || typeof lessonId !== 'number') {
    return next(new AppError('Invalid course ID or lesson ID', 400));
  }
  
  const isEnrolled = enrollments.some(e => e.userId === req.user.id && e.courseId === courseId);
  if (!isEnrolled) {
    return next(new AppError('Completing lesson without enrollment', 400));
  }
  
  let userProgress = progress.find(p => p.userId === req.user.id && p.courseId === courseId);
  if (!userProgress) {
    userProgress = { userId: req.user.id, courseId, completedLessons: [] };
    progress.push(userProgress);
  }
  
  if (userProgress.completedLessons.includes(lessonId)) {
    return next(new AppError('Completing same lesson twice', 400));
  }
  
  userProgress.completedLessons.push(lessonId);
  res.status(200).json({ message: 'Lesson marked as complete', progress: userProgress });
};

const getProgress = (req, res, next) => {
  const courseId = parseInt(req.params.courseId);
  if (isNaN(courseId)) {
     return next(new AppError('Invalid course ID', 400));
  }
  
  const userProgress = progress.find(p => p.userId === req.user.id && p.courseId === courseId);
  if (!userProgress) {
    return res.status(200).json({ userId: req.user.id, courseId, completedLessons: [] });
  }
  
  res.status(200).json(userProgress);
};

module.exports = { markLessonComplete, getProgress };
