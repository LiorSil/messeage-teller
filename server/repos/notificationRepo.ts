import Notification from "../models/notificationsModel";
import { INotification } from "../models/model.interfaces";
import { Types } from "mongoose";

const createOrUpdateNotification = async (
  fromId: Types.ObjectId,
  recipientId: Types.ObjectId | Types.ObjectId[]
): Promise<INotification> => {
  const recipientsToAdd = Array.isArray(recipientId)
    ? recipientId
    : [recipientId];

  // Use $addToSet to prevent duplicates during push
  const notification = await Notification.findOneAndUpdate(
    { fromId },
    { $addToSet: { recipients: { $each: recipientsToAdd } } }, // Add only unique recipients
    { new: true, upsert: true } // Create if not found, return updated doc
  ).exec();

  return notification as INotification;
};


// Main function: Remove recipients and handle edge cases
const pullRecipient = async (
  fromId: Types.ObjectId,
  recipientId: Types.ObjectId | Types.ObjectId[]
): Promise<INotification | null> => {
  const recipientsToRemove = Array.isArray(recipientId)
    ? recipientId
    : [recipientId];

  const notification = await Notification.findOneAndUpdate(
    { fromId }, 
    { $pull: { recipients: { $in: recipientsToRemove } } },
    { new: true }
  ).exec();
  return notification;
};

export default { createOrUpdateNotification, pullRecipient };

