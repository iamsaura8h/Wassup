const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { username, password, avatar } = req.body;
  if (!username || !password || !avatar) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(409).json({ message: 'Username already taken' });
  }

  const user = await User.create({ username, password, avatar });
  const token = generateToken(user._id);

  res.status(201).json({
    token,
    user: { _id: user._id, username: user.username, avatar: user.avatar }
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user._id);
  res.json({
    token,
    user: { _id: user._id, username: user.username, avatar: user.avatar }
  });
};
