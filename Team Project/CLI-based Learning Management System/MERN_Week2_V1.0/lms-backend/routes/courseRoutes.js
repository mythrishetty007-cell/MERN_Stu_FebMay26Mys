const express = require('express');
const router = express.Router();
const { getAllCourses, validateCourseId, getCourseDetails, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { authMiddleware } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/', getAllCourses);
router.get('/:id', validateCourseId, getCourseDetails);

// Protected admin routes
router.post('/', authMiddleware, roleMiddleware('admin'), createCourse);
router.put('/:id', authMiddleware, roleMiddleware('admin'), validateCourseId, updateCourse);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), validateCourseId, deleteCourse);

module.exports = router;
