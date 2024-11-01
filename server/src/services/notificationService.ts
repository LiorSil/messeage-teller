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
  const notification = await notificationRepo.pullRecipient(
    fromId,
    recipientId
  );
  if (!notification) console.warn("Notification not found");
  return notification;
};
const getActiveNotifications = async (
  recipientId: Types.ObjectId
): Promise<INotification[]> => {
  const notifications = await notificationRepo.findNotificationsForRecipient(
    recipientId
  );
  return notifications;
};

export default { pushNotification, pullRecipient, getActiveNotifications };
