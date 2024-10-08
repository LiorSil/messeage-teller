import { Request, Response } from "express";
import {
  registerUser,
  findUserByEmail,
  findUserByPhoneNumber,
} from "../services/userService";
import jwt from "jsonwebtoken";
import contactService from "../services/contactService";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, phoneNumber } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingPhoneNumber = await findUserByPhoneNumber(phoneNumber);
    if (existingPhoneNumber) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const user = await registerUser(email, password, phoneNumber);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

//TODO: implement generateOtp
//TODO: implement verifyOtp

export { register, login };
