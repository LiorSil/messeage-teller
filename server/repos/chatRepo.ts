import { Types } from "mongoose";
import { IMessage, IChat } from "../models/model.interfaces";
import Chat from "../models/chatModel";

const createChat = async (chatData: {
  participants: Types.ObjectId[];
  messages: IMessage[];
}): Promise<IChat> => {
  const chat = new Chat(chatData);

  return await chat.save();
};

const getChatById = async (
  chatId: Types.ObjectId | string
): Promise<IChat | null> => {
  const chat = await Chat.findById(chatId).exec();

  return chat;
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
  getChatById,
  getChats,
  updateChat,
  deleteChat,
};




