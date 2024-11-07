import notificationRepo from "../repositories/notificationRepo";
import {INotification} from "../models/model.interfaces";
import {Types} from "mongoose";

const getNotifications = async (contactId: Types.ObjectId): Promise<INotification | null> => {
    return notificationRepo.getNotifications(contactId);
}

const pushNotification = async (
    contactId: Types.ObjectId,
    subContactNotification: Types.ObjectId
): Promise<INotification | null> => {
    return notificationRepo.pushNotification(contactId, subContactNotification);
}

const pullNotification = async (
    contactId: Types.ObjectId,
    subContactNotification: Types.ObjectId
): Promise<INotification | null> => {
    return notificationRepo.pullNotification(contactId, subContactNotification);
}


export default {
    getNotifications,
    pushNotification,
    pullNotification
};




