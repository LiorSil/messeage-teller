import {Types} from "mongoose";
import {INotification} from "../models/model.interfaces";
import notificationRepo from "../repositories/notificationRepo";

const createOrUpdateNotification = async (
    fromId: Types.ObjectId,
    recipientId: Types.ObjectId | Types.ObjectId[]
): Promise<INotification> => {
    const recipientsToAdd = Array.isArray(recipientId)
        ? recipientId
        : [recipientId];

    return await notificationRepo.createOrUpdateNotification(
        fromId,
        recipientsToAdd
    );
}
const pullRecipient = async (
    fromId: Types.ObjectId,
    recipientId: Types.ObjectId[]
): Promise<INotification | null> => {
    const recipientsToRemove = Array.isArray(recipientId)
        ? recipientId
        : [recipientId];

    return await notificationRepo.pullRecipient(fromId, recipientsToRemove);
}

const findNotificationsForRecipient = async (recipientId: Types.ObjectId) => {
    return await notificationRepo.findNotificationsForRecipient(recipientId);
}


export default {
    createOrUpdateNotification,
    pullRecipient,
    findNotificationsForRecipient,
};




