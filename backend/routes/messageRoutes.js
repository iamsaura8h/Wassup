const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const {getMessagesBetweenUsers } = require('../controllers/messageController');

// @route   POST /api/messages
router.post('/', authMiddleware, sendMessage);
router.get('/:user1/:user2', authMiddleware, getMessagesBetweenUsers);

module.exports = router;
