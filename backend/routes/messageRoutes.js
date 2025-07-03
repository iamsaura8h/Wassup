const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/messages
router.post('/', authMiddleware, sendMessage);

module.exports = router;
