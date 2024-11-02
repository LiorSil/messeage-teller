import {Router} from "express";
import contactController from "../controllers/contactController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, contactController.getContact);
router.get("/:query", authMiddleware, contactController.findContactsByQuery);
router.put("/addSubContact", authMiddleware, contactController.addSubContact);
router.put("/updateProfile", authMiddleware, contactController.updateProfile);

export default router;
