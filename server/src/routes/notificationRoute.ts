import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import { pullNotification } from "../controllers/notificationController";

const router = Router();

router.put("/acknowledgeNotification", authMiddleware ,pullNotification);
export default router;



