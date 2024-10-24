import { Types } from "mongoose";
import { IMessage, IChat } from "../models/model.interfaces";
import Chat from "../models/chatModel";

const getOrCreateChat = async (
  participants: Types.ObjectId[] | null
): Promise<IChat> => {
  if (!participants) {
    throw new Error("Participants are required to create a chat");
  } 
 
  participants = participants.sort();
  const existingChat = await Chat.findOne({ participants }).exec();
  if (existingChat) {
    return existingChat;
  } else {
console.log("creating new chat");
const newChat = new Chat({
  participants: participants,
  messages: [],
  notification: [],
});
  return await newChat.save();
  }
};

const contactChats = async (
  contactId: Types.ObjectId | string
): Promise<IChat[]> => {
  return await Chat.find({ participants: contactId }).exec();
}

const getChatById = async (
  chatId: Types.ObjectId | string
): Promise<IChat | null> => {
  const chat = await Chat.findById(chatId).exec();

  return chat;
};

const pushMessage = async (
  chatId: Types.ObjectId | string,
  message: Partial<IMessage>
): Promise<IChat | null> => {
  return await Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: message } },
    { new: true }
  ).exec();
};

const getChats = async (): Promise<IChat[]> => {
  return await Chat.find().exec();
};

const updateChat = async (
  chatId: Types.ObjectId | string,
  updateData: Partial<IChat>
): Promise<IChat | null> => {
  return await Chat.findByIdAndUpdate(chatId, updateData, { new: true }).exec();
};

const deleteChat = async (
  chatId: Types.ObjectId | string
): Promise<IChat | null> => {
  return await Chat.findByIdAndDelete(chatId).exec();
};

export default {
  getOrCreateChat,
  contactChats,
  pushMessage,
  getChatById,
  getChats,
  updateChat,
  deleteChat,
};
