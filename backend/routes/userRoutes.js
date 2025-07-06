const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');

router.get('/', auth, getAllUsers);
router.put('/update', auth, updateUser);
router.delete('/delete', auth, deleteUser);

module.exports = router;
