import {Types} from "mongoose";
import {IChat, IMessage} from "../models/model.interfaces";
import Chat from "../models/chatModel";

const getOrCreateChat = async (
    participants: Types.ObjectId[] | null
): Promise<IChat> => {
    if (!participants) {
        throw new Error("Participants are required to create a chat");
    }
    const existingChat = await getChat(participants);
    if (existingChat) {
        return existingChat;
    } else {
        console.log("Creating new chat");
        const newChat = new Chat({
            participants: participants,
            messages: [],
            notification: [],
        });
        return await newChat.save();
    }
};


const pushMessage = async (
    chatId: Types.ObjectId | string,
    message: Partial<IMessage>
): Promise<IChat | null> => {
    return await Chat.findByIdAndUpdate(
        chatId,
        {$push: {messages: message}},
        {new: true}
    ).exec();
};

const getChats = async (): Promise<IChat[] | IChat> => {
    return await Chat.find().exec();
};

const getChat = async (participants: Types.ObjectId[]): Promise<IChat | null> => {
    return await Chat.findOne({
        participants: {$all: participants},
        $expr: {$eq: [{$size: "$participants"}, participants.length]},
    }).exec();
};

const updateChat = async (
    chatId: Types.ObjectId | string,
    updateData: Partial<IChat>
): Promise<IChat | null> => {
    return await Chat.findByIdAndUpdate(chatId, updateData, {new: true}).exec();
};

const deleteChat = async (
    chatId: Types.ObjectId | string
): Promise<IChat | null> => {
    return await Chat.findByIdAndDelete(chatId).exec();
};

const getChatsByParticipant = async (participantId: Types.ObjectId): Promise<IChat[]> => {
    try {
        return await Chat.find({
            participants: {$in: [participantId]}
        }).exec();
    } catch (error) {
        console.error("Error retrieving chats by participant:", error);
        throw new Error("Failed to retrieve chats.");
    }
};

export default {
    getOrCreateChat,
    pushMessage,
    getChats,
    getChat,
    updateChat,
    deleteChat,
    getChatsByParticipant
};
