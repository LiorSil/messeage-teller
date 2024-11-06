import {Types} from "mongoose";
import {IChat, IMessage} from "../models/model.interfaces";
import Chat from "../models/chatModel";


const pushMessage = async (
    chatId: Types.ObjectId,
    message: Partial<IMessage>
): Promise<IChat | null> => {
    return await Chat.findByIdAndUpdate(
        chatId,
        {$push: {messages: message}},
        {new: true}
    ).exec();
};
const pushNotification = async (

    chatId: Types.ObjectId,
    recipientId: Types.ObjectId
): Promise<IChat | null> => {
    console.log("Pushing notification to:", recipientId);
    console.log("chatId:", chatId);
    const success = await Chat.findByIdAndUpdate(
        chatId,
        {$push: {notifications: recipientId}},
        {new: true}
    ).exec();
    console.log("Notification pushed:", success);
    return success;
}

const getChats = async (): Promise<IChat[] | IChat> => {
    return await Chat.find().exec();
};

const getOrCreateChat = async (
    participants: Types.ObjectId[]
): Promise<IChat> => {
    let chat = await Chat.findOne({
        participants: {$all: participants},
        $expr: {$eq: [{$size: "$participants"}, participants.length]},
    }).exec();

    // If no chat is found, create a new one
    if (!chat) {
        chat = new Chat({participants});
        await chat.save();
    }
    return chat;
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

const getChatsByContactId = async (participantId: Types.ObjectId): Promise<IChat[]> => {
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
    pushMessage,
    pushNotification,
    getChats,
    getOrCreateChat,
    updateChat,
    deleteChat,
    getChatsByContactId
};
