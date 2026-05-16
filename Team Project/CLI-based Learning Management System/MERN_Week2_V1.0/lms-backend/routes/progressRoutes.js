const express = require('express');
const router = express.Router();
const { markLessonComplete, getProgress } = require('../controllers/progressController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/:courseId/lesson', markLessonComplete);
router.get('/:courseId', getProgress);

module.exports = router;
