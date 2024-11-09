import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import { acknowledgeNotification } from "../controllers/notificationController";


const router = Router();

router.put("/acknowledgeNotification", authMiddleware, acknowledgeNotification);
export default router;



