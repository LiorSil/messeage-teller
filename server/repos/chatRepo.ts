import { Types } from "mongoose";
import Chat, { IMessage, IChat } from "../models/chatModel";
import exp from "constants";

const createChat = async (chatData: Partial<IChat>): Promise<IChat> => {
  const chat = new Chat(chatData);

  return await chat.save();
};

const getChatById = async (
  chatId: Types.ObjectId | string
): Promise<IChat | null> => {
  const chat = await Chat.findById(chatId).populate("participants").exec();

  return chat;
};

export default { createChat, getChatById };
