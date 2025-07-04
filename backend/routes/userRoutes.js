const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/users — list all users (except current if needed)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("_id username");
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Failed to fetch users:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
