import { Request, Response } from "express";
import { getUsersService } from "../services/user.service";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

//TODO: implement generateOtp
//TODO: implement verifyOtp
