import chatRepo from "../repos/chatRepo";
import { IChat, IContact, IMessage } from "../models/model.interfaces";
import { Schema } from "mongoose";

const createChat = async (
  contacts: IContact[],
  messages?: IMessage[] | IMessage
): Promise<IChat> => {
  if (messages && !Array.isArray(messages)) {
    messages = [messages];
  }
  const chatData = {
    participants: contacts.map(
      (contact): Schema.Types.ObjectId => contact._id as Schema.Types.ObjectId
    ),
    messages: messages || [],
  };

  return await chatRepo.createChat(chatData);
};

export default { createChat };
