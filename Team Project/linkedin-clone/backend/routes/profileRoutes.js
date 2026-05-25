const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getMyProfile,
  updateProfile,
  getProfileById,
  searchProfiles
} = require('../controllers/profileController');

router.get('/me', protect, getMyProfile);
router.put('/', protect, updateProfile);
router.get('/search', protect, searchProfiles);
router.get('/:id', protect, getProfileById);

module.exports = router;