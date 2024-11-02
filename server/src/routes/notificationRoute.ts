import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware";
import notificationController from "../controllers/notificationController";

const router = Router();

router.put("/pushNotification", authMiddleware, notificationController.pushNotification);
router.put("/removeNotification", authMiddleware, notificationController.removeNotification);

export default router;