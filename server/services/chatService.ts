import chatRepo from "../repos/chatRepo";
import { IChat, IContact, IMessage } from "../models/model.interfaces";
import { Schema, Types } from "mongoose";

const createChat = async (
  contacts: Types.ObjectId[],
  message: IMessage
): Promise<IChat> => {
  const participants = contacts.map((contact) => contact._id);
  const chatData = {
    participants,
    messages: [message],
  };

  const chat = await chatRepo.createChat(chatData);

  return chat;
};

export default { createChat };
