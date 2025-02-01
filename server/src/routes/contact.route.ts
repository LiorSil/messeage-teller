import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getContact,
  findContactsByQuery,
  ModifySubContact,
  updateContact,
} from "../controllers/contact.controller";

const router = Router();

router.get("/", authMiddleware, getContact);
router.get("/:query", authMiddleware, findContactsByQuery);
router.put("/fetchModifySubContact", authMiddleware, ModifySubContact);
router.put("/updateContact", authMiddleware, updateContact);

export default router;
