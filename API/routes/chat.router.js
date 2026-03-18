import express from "express";
import { sendMessage, getMessages } from "../controller/chat.controller.js";

const router = express.Router();

router.post("/message", sendMessage);
router.get("/messages/:chatId", getMessages);

export default router;