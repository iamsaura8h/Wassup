import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { receiverId, text } = req.body;
  if (!receiverId || !text) return res.status(400).json({ error: "Invalid payload" });

  const message = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    text,
  });

  res.json(message);
};

export const getMessages = async (req, res) => {
  const { user1, user2 } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort("timestamp");

  res.json(messages);
};

export const markSeen = async (req, res) => {
  const { senderId } = req.body;
  await Message.updateMany({ sender: senderId, receiver: req.user._id, seen: false }, { seen: true });
  res.json({ success: true });
};
