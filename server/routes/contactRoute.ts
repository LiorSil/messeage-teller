import express from "express";
import * as contactController from "../controllers/contactController";
import authMiddleware from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/", contactController.createContact);
router.get("/", authMiddleware, contactController.getContacts);
router.get("/:id", contactController.getContactById);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

export default router;
