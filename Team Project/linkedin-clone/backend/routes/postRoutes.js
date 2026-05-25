const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  createPost,
  getFeed,
  likePost,
  commentOnPost,
  getAllPosts,
  deletePost
} = require('../controllers/postController');

router.post('/', protect, upload.single('file'), createPost);
router.get('/feed', protect, getFeed);
router.get('/', protect, restrictTo('admin'), getAllPosts);
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentOnPost);
router.delete('/:id', protect, deletePost);

module.exports = router;