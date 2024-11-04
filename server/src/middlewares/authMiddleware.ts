import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import contactService from "../services/contactService";
import contactRepo from "../repositories/contactRepo";

interface CustomRequest extends Request {
  contact?: any;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("No token provided");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    if (decoded) {
      [req.body.contact] = await contactRepo.getContactsByQuery(decoded.phoneNumber)
      next();
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
