import {
  getNotifications,
  pushNotification,
  pullNotification,
} from "../repositories/notificationRepo";
import {INotification} from "../models/model.interfaces";
import {Types} from "mongoose";

export const getNotificationsService = async (contactId: Types.ObjectId): Promise<INotification | null> => {
    return getNotifications(contactId);
}

export const pushNotificationService = async (
  contactId: Types.ObjectId,
  subContactNotification: Types.ObjectId
): Promise<INotification | null> => {
  return await pushNotification(contactId, subContactNotification);
};

export const pullNotificationService = async (
  contactId: Types.ObjectId,
  subContactNotification: Types.ObjectId
): Promise<INotification | null> => {
  return pullNotification(contactId, subContactNotification);
};





