import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware";
import chatController from "../controllers/chatController";

const router = Router();

router.get("/chatsByParticipants",authMiddleware, chatController.getChatsByParticipantsIds);

export default router;
