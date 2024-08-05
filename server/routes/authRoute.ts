import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// TODO: Add generateOtp and verifyOtp routes

export default router;
