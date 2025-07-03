const Message = require("../models/Message");

// @desc    Send a message (save it in DB)
// @route   POST /api/messages
// @access  Private (JWT needed)
exports.sendMessage = async (req, res) => {
  try {
    const { receiver, text } = req.body;

    const message = new Message({
      sender: req.user.id, // comes from authMiddleware
      receiver,
      text,
    });

    const savedMessage = await message.save();

    res.status(201).json(savedMessage);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send message", error: err.message });
  }
};

// @desc    Get all messages between two users
// @route   GET /api/messages/:user1/:user2
// @access  Private (JWT)
exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const userId1 = new mongoose.Types.ObjectId(user1);
    const userId2 = new mongoose.Types.ObjectId(user2);

    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    })
    .sort({timestamp : 1})     //sort from oldest -> newest from timestamp


    res.status(200).json(messages);
    
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch messages", error: err.message });
  }
};
