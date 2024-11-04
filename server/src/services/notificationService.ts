import notificationRepo from "../repositories/notificationRepo";
import {INotification} from "../models/model.interfaces";
import {Types} from "mongoose";

const pushNotification = async (fromId: Types.ObjectId, recipientId: Types.ObjectId | Types.ObjectId[]): Promise<INotification> => {
  return await notificationRepo.createOrUpdateNotification(fromId, recipientId);
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
  return await notificationRepo.findNotificationsForRecipient(
      recipientId
  );
};

export default { pushNotification, pullRecipient, getActiveNotifications };
