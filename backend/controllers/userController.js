const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const { username, password, avatar } = req.body;
  const user = await User.findById(req.user._id);

  if (username) user.username = username;
  if (password) user.password = password;
  if (avatar) user.avatar = avatar;

  await user.save();

  res.json({ message: 'Profile updated', user: { _id: user._id, username: user.username, avatar: user.avatar } });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: 'User deleted successfully' });
};
