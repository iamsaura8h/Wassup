import express from "express";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:user1/:user2", authMiddleware, getMessages);
router.post("/", authMiddleware, sendMessage);

export default router;
