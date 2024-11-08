import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getChatsByParticipantsIds } from "../controllers/chatController";
const router = Router();

router.get("/chatsByParticipants", authMiddleware, getChatsByParticipantsIds);

export default router;
