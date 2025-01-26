import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getContact,
  findContactsByQuery,
  addSubContact,
  updateProfile,
} from "../controllers/contact.controller";

const router = Router();

router.get("/", authMiddleware, getContact);
router.get("/:query", authMiddleware, findContactsByQuery);
router.put("/addSubContact", authMiddleware, addSubContact);
router.put("/updateProfile", authMiddleware, updateProfile);

export default router;
