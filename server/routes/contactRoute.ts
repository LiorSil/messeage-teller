import express from "express";
import * as contactController from "../controllers/contactController";
import authMiddleware from "../middlewares/authMiddleware";
const router = express.Router();


router.get("/", authMiddleware, contactController.getContact);
router.get("/:query", authMiddleware, contactController.findContactsByQuery);
router.put("/addSubContact", authMiddleware, contactController.addSubContact);

export default router;
