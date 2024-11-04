import chatRepo from "../repositories/chatRepo";
import {IChat, IMessage} from "../models/model.interfaces";
import {sortSubContactsByLatestChats} from "../repositories/sortSubContactsByMessages";
import notificationRepo from "../repositories/notificationRepo";
import {Types} from "mongoose";

const getOrCreateChat = async (
    contactAId: Types.ObjectId,
    contactBId: Types.ObjectId): Promise<IChat> => {
    return await chatRepo.getOrCreateChat([contactAId, contactBId]);
};

const createMessage = async (
    chatId: Types.ObjectId,
    messageData: Partial<IMessage>
): Promise<IChat | null> => {
    const newMessage = await chatRepo.pushMessage(chatId, messageData);
    await sortSubContactsByLatestChats(messageData.fromId?.toString() as any);
    await sortSubContactsByLatestChats(messageData.toId?.toString() as any);
    //add notification logic here
    await notificationRepo.createOrUpdateNotification(
        messageData.fromId as any,
        messageData.toId as any
    );

    return newMessage;
};


export default { getOrCreateChat, createMessage,};