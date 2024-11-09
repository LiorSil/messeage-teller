import notificationModel from "../models/notificationsModel";
import { INotification } from "../models/model.interfaces";
import { Types } from "mongoose";

export const getNotifications = async (
  contactId: Types.ObjectId
): Promise<INotification | null> => {
  return notificationModel.findOne({ _id: contactId }).exec();
};

export const pushNotification = async (
  contactId: Types.ObjectId,
  subContactNotification: Types.ObjectId
): Promise<INotification | null> => {
  const result = await notificationModel
    .findOneAndUpdate(
      { _id: contactId },
      { $addToSet: { contactNotifications: subContactNotification } }, // Use $addToSet to avoid duplicates
      { new: true, upsert: true } // 'upsert: true' creates a new document if none exists
    )
    .exec();

  return result;
};

export const pullNotification = async (
  contactId: Types.ObjectId,
  subContactNotification: Types.ObjectId
): Promise<INotification | null> => {
  return notificationModel
    .findByIdAndUpdate(
      contactId,
      { $pull: { contactNotifications: subContactNotification } },
      { new: true }
    )
    .exec();
};
