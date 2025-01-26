import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getChatByParticipants } from "../controllers/chat.controller";
const router = Router();

router.get("/chatsByParticipants", authMiddleware, getChatByParticipants);

export default router;
