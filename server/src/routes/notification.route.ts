import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import { acknowledgeNotification } from "../controllers/notification.controller";


const router = Router();

router.put("/acknowledgeNotification", authMiddleware, acknowledgeNotification);
export default router;



