import { Request, Response } from "express";
import notificationRepo from "../repositories/notificationRepo";

const pushNotification = async (req: Request, res: Response) => {
  const { fromId, recipientId } = req.body;

  try {
    const notification = await notificationRepo.createOrUpdateNotification(
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
    const notification = await notificationRepo.pullRecipient(
      fromId,
      recipientId
    );
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};



export default { pushNotification, removeNotification };
