import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware";
import notificationController from "../controllers/notificationController";

const router = Router();

router.put("/acknowledgeNotification", authMiddleware, notificationController.pullNotification);

export default router;