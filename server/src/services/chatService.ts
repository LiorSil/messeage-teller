import { IChat, IMessage } from "../models/model.interfaces";
import { pushMessage } from "../repositories/chatRepo";
import { sortSubContactsByLatestChats } from "../repositories/sortSubContactsByMessages";
import { Types } from "mongoose";
import { pushNotificationService } from "./notificationService";
import { getOrCreateChat } from "../repositories/chatRepo";

export const createMessageService = async (
  chatId: Types.ObjectId,
  messageData: IMessage
): Promise<IChat | null> => {
  const newMessage = await pushMessage(chatId, messageData);

  await sortSubContactsByLatestChats(messageData.fromId);
  await sortSubContactsByLatestChats(messageData.toId);
  //add notification logic here


  return newMessage;
};

export const getChatByParticipants = async (participants: Types.ObjectId[]) => {
  return await getOrCreateChat(participants);
};
