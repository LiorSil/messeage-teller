import chatRepo from "../repos/chatRepo";
import {IChat, IMessage} from "../models/model.interfaces";
import {sortSubContactsByLatestChats} from "../repos/sortSubContactsByMessages";
import notificationRepo from "../repos/notificationRepo";
import {Types} from "mongoose";

const getChat = async (
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

const getChatByParticipantsIds = async (
    participants: string | string[]
): Promise<IChat[] | null> => {
    // Ensure participants is an array
    const participantIds = Array.isArray(participants)
        ? participants
        : [participants];

    const chats = await chatRepo.getChats();

    // Filter chats that contain all participants
    const matchingChats = chats.filter((chat) =>
        participantIds.every((participant) =>
            chat.participants.includes(participant as any)
        )
    );

    return matchingChats.length > 0 ? matchingChats : null;
};

export default {getChat, createMessage, getChatByParticipantsIds};