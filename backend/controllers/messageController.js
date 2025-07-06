const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort('timestamp');

  res.json(messages);
};

exports.sendMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;
  const newMessage = await Message.create({
    sender,
    receiver,
    message,
    delivered: true
  });

  res.status(201).json(newMessage);
};

exports.seenMessage = async (req, res) => {
  try {
    const updated = await Message.updateMany(
      { sender: req.params.senderId, receiver: req.user._id, seen: false },
      { $set: { seen: true } }
    );
    res.json({ message: 'Messages marked as seen', count: updated.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update seen status' });
  }
};