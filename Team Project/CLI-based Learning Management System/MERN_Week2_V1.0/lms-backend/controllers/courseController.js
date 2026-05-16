const courses = require('../data/courses');
const AppError = require('../utils/customError');

const getAllCourses = (req, res, next) => {
  let filteredCourses = courses;
  if (req.query.category) {
    filteredCourses = filteredCourses.filter(c => c.category === req.query.category);
  }
  if (req.query.level) {
    filteredCourses = filteredCourses.filter(c => c.level === req.query.level);
  }
  res.status(200).json(filteredCourses);
};

const validateCourseId = (req, res, next) => {
  const courseId = parseInt(req.params.id);
  if (isNaN(courseId)) {
    return next(new AppError('Invalid course ID', 400));
  }
  req.courseId = courseId;
  next();
};

const getCourseDetails = (req, res, next) => {
  const course = courses.find(c => c.id === req.courseId);
  if (!course) {
    return next(new AppError('Course not found', 404));
  }
  res.status(200).json(course);
};

const createCourse = (req, res, next) => {
  const { title, category, level, description } = req.body;
  if (!title || !category || !level) {
    return next(new AppError('Missing required fields in request body', 400));
  }
  const newCourse = {
    id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
    title, category, level, description
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
};

const updateCourse = (req, res, next) => {
  const courseIndex = courses.findIndex(c => c.id === req.courseId);
  if (courseIndex === -1) {
    return next(new AppError('Course not found', 404));
  }
  courses[courseIndex] = { ...courses[courseIndex], ...req.body };
  res.status(200).json(courses[courseIndex]);
};

const deleteCourse = (req, res, next) => {
  const courseIndex = courses.findIndex(c => c.id === req.courseId);
  if (courseIndex === -1) {
    return next(new AppError('Course not found', 404));
  }
  courses.splice(courseIndex, 1);
  res.status(200).json({ message: 'Course deleted successfully' });
};

module.exports = { getAllCourses, validateCourseId, getCourseDetails, createCourse, updateCourse, deleteCourse };
