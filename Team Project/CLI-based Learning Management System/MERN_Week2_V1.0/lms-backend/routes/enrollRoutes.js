const express = require('express');
const router = express.Router();
const { enroll, getUserEnrollments, withdraw } = require('../controllers/enrollController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/enroll/:courseId', enroll);
router.delete('/enroll/:courseId', withdraw);
router.get('/users/enrollments', getUserEnrollments);
router.get('/users/:userId/enrollments', getUserEnrollments);

module.exports = router;
