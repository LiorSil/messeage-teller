import {Router} from "express";
import {register, login} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// TODO: Add generateOtp and verifyOtp routes

export default router;
