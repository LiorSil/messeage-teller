import chatRepo from "../repositories/chatRepo";
import {IChat, IMessage} from "../models/model.interfaces";
import {sortSubContactsByLatestChats} from "../repositories/sortSubContactsByMessages";
import {Types} from "mongoose";

const getOrCreateChat = async (
    contactAId: Types.ObjectId,
    contactBId: Types.ObjectId): Promise<IChat> => {
    return await chatRepo.getOrCreateChat([contactAId, contactBId]);
};

const createMessage = async (
    chatId: Types.ObjectId,
    messageData: IMessage
): Promise<IChat | null> => {

    const newMessage = await chatRepo.pushMessage(chatId, messageData);
    await sortSubContactsByLatestChats(messageData.fromId);
    await sortSubContactsByLatestChats(messageData.toId);
    //add notification logic here
    await chatRepo.pushNotification(chatId, messageData.toId);
    return newMessage;

};


const getChatByParticipants = async (participants: Types.ObjectId[]) => {
    return await chatRepo.getOrCreateChat(participants);
}


export default {getOrCreateChat, createMessage, getChatByParticipants};