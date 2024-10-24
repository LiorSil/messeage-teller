import notificationRepo from "../repos/notificationRepo";
import { INotification } from "../models/model.interfaces";
import { Types } from "mongoose";

const pushNotification = async (fromId: Types.ObjectId, recipientId: Types.ObjectId | Types.ObjectId[]): Promise<INotification> => {
  const notification = await notificationRepo.createOrUpdateNotification(fromId, recipientId);
  return notification;
}

const pullRecipient = async (
  fromId: Types.ObjectId,
  recipientId: Types.ObjectId | Types.ObjectId[]
): Promise<INotification | null> => {
  const notification = notificationRepo.pullRecipient(fromId, recipientId);
  if (!notification) console.warn("Notification not found");
  return notification;
};

export default { pushNotification, pullRecipient };
