import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
  res.json(users);
};
