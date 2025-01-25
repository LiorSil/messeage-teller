import { IChat, IMessage } from "../models/model.interfaces";
import { pushMessage } from "../repositories/chatRepo";
import { sortSubContactsByLatestChats } from "../repositories/sortSubContactsByMessages";
import { Types } from "mongoose";
import { getOrCreateChat } from "../repositories/chatRepo";

export const createMessageService = async (
  chatId: Types.ObjectId,
  messageData: IMessage
): Promise<IChat | null> => {
  const newMessage = await pushMessage(chatId, messageData);


  //add notification logic here

  return newMessage;
};

export const getChatByParticipants = async (participants: Types.ObjectId[]) => {
  const chat  = await getOrCreateChat(participants);

  
  return chat;
};


