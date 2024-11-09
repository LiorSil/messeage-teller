import { Request, Response } from "express";
import {
  pullNotificationService,
  pushNotificationService,
} from "../services/notificationService";

export const creteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contactId, subContactId } = req.body;
    const result = await pushNotificationService(contactId, subContactId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const acknowledgeNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contactId, subContactId } = req.body;
    const result = await pullNotificationService(contactId, subContactId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
