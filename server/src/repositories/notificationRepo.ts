import Notification from "../models/notificationsModel";
import {INotification} from "../models/model.interfaces";
import {Types} from "mongoose";

const getNotifications = async (contactId: Types.ObjectId): Promise<INotification | null> => {
    return Notification.findOne({contactId}).exec();
}

const pushNotification = async (
    contactId: Types.ObjectId,
    subContactNotification: Types.ObjectId
): Promise<INotification | null> => {
    return Notification.findOneAndUpdate (
        {contactId},
        {$push: {contactNotifications: subContactNotification}},
        {new: true}
    ).exec();
}

const pullNotification = async (
    contactId: Types.ObjectId,
    subContactNotification: Types.ObjectId
): Promise<INotification | null> => {
    return Notification.findOneAndUpdate (
        {contactId},
        {$pull: {contactNotifications: subContactNotification}},
        {new: true}
    ).exec();
}


    export default {
        getNotifications,
        pushNotification,
        pullNotification
    };

