const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getMessages, sendMessage, seenMessage } = require('../controllers/messageController');

router.get('/:user1/:user2', auth, getMessages);
router.post('/', auth, sendMessage);
router.post('/seen/:senderId',auth, seenMessage);

module.exports = router;
