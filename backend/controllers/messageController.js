const Message = require('../models/Message');

// @desc    Send a message (save it in DB)
// @route   POST /api/messages
// @access  Private (JWT needed)
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, text } = req.body;

    const message = new Message({
      sender: req.user.id,     // comes from authMiddleware
      receiver,
      text
    });

    const savedMessage = await message.save();

    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
};
