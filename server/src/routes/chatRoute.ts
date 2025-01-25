import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getChatByParticipants } from "../controllers/chatController";
const router = Router();

router.get("/chatsByParticipants", authMiddleware, getChatByParticipants);

export default router;
