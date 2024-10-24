import { Request, Response } from "express";
import notificationService from "../services/notificationService";

const pushNotification = async (req: Request, res: Response) => {
  const { fromId, recipientId } = req.body;

  try {
    const notification = await notificationService.pushNotification(
      fromId,
      recipientId
    );
    res.status(201).json(notification);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const removeNotification = async (req: Request, res: Response) => {
  const { fromId, recipientId } = req.body;

  try {
    const notification = await notificationService.pullRecipient(
      fromId,
      recipientId
    );
    res.status(200).json(notification);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default { pushNotification, removeNotification };
