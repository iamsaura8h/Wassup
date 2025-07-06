import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, password, avatar } = req.body;
  if (!avatar) return res.status(400).json({ error: "Avatar is required" });

  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ error: "Username already taken" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, avatar });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { _id: user._id, username, avatar } });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { _id: user._id, username, avatar: user.avatar } });
};
