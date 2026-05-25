const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  sendRequest,
  getRequests,
  acceptRequest,
  rejectRequest,
  getConnections
} = require('../controllers/connectionController');

router.post('/request/:userId', protect, sendRequest);
router.get('/requests', protect, getRequests);
router.put('/accept/:requestId', protect, acceptRequest);
router.put('/reject/:requestId', protect, rejectRequest);
router.get('/', protect, getConnections);

module.exports = router;