import { Types } from "mongoose";
import { IMessage, IChat } from "../models/model.interfaces";
import Chat from "../models/chatModel";

const createChat = async (
  participants: Types.ObjectId[] | null
): Promise<IChat> => {
  if (!participants) {
    throw new Error("Participants are required to create a chat");
  }

  participants = participants.sort();

  const isChatExisted = await Chat.findOne({ participants }).exec();

  if (isChatExisted) {
    return isChatExisted;
  }

  const newChat = new Chat({ participants });
  console.log("created newChat:", newChat);
  return await newChat.save();
};

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
  createChat,
  pushMessage,
  getChatById,
  getChats,
  updateChat,
  deleteChat,
};
