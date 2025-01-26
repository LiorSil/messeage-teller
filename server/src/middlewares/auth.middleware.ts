import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getContactsByQueryService } from "../services/contact.service";

interface CustomRequest extends Request {
  contact?: any;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Access denied." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded) {
      [req.body.contact] = await getContactsByQueryService(decoded.phoneNumber);
      next();
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};
