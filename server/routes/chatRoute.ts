import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import chatController from "../controllers/chatController";
const router = Router();

router.post("/", authMiddleware, chatController.createChat);

export default router;
