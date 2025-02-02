import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getContact,
  findContactsByQuery,
  modifySubContact,
  updateContact,
} from "../controllers/contact.controller";

const router = Router();

router.get("/", authMiddleware, getContact);
router.get("/:query", authMiddleware, findContactsByQuery);
router.put("/fetchModifySubContact", authMiddleware, modifySubContact);
router.put("/updateContact", authMiddleware, updateContact);

export default router;
