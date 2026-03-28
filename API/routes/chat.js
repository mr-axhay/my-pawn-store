import express from "express";
import { handleChat } from "../controller/chatController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, handleChat);

export default router;