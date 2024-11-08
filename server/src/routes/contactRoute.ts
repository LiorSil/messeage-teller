import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getContact,
  findContactsByQuery,
  addSubContact,
  updateProfile,
} from "../controllers/contactController";

const router = Router();

router.get("/", authMiddleware, getContact);
router.get("/:query", authMiddleware, findContactsByQuery);
router.put("/addSubContact", authMiddleware, addSubContact);
router.put("/updateProfile", authMiddleware, updateProfile);

export default router;
