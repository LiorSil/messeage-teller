import {Request, Response} from "express";
import { pullNotificationService } from "../services/notificationService";



export const pullNotification = async (req: Request, res: Response): Promise<void> => {
  const { contactId, subContactNotification } = req.body;
  const result = await pullNotificationService(
    contactId,
    subContactNotification
  );
  res.status(200).json(result);
};


