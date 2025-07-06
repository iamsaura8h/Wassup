import express from "express";
import { getMessages, sendMessage, markSeen } from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:user1/:user2", authMiddleware, getMessages);
router.post("/", authMiddleware, sendMessage);
router.post("/seen", authMiddleware, markSeen); // NEW

export default router;
