import chatRepo from "../repos/chatRepo";
import { IChat, IContact, IMessage } from "../models/model.interfaces";
import { Schema, Types } from "mongoose";
import contactService from "./contactService";

const getChat = async (contacts: string[]): Promise<IChat> => {
  const participants = await contactService.getContactsByIds(contacts);

  if (!participants || participants.length === 0) {
    throw new Error(
      "Invalid contacts. Unable to create chat with undefined or empty contacts."
    );
  }

  const contactIds = participants.map((contact: IContact) => contact._id);

  if (contactIds.some((id) => !id)) {
    throw new Error("One or more contacts have invalid IDs.");
  }

  const chat = await chatRepo.getChat(contactIds);
  return chat;
};

const createMessage = async (
  chatId: Types.ObjectId,
  messageData: Partial<IMessage>
): Promise<IChat | null> => {
  return await chatRepo.pushMessage(chatId, messageData);
};

const getChatByParticipantsIds = async (
  participants: string | string[]
): Promise<IChat[] | null> => {
  // Ensure participants is an array
  const participantIds = Array.isArray(participants)
    ? participants
    : [participants];

  const chats = await chatRepo.getChats();

  // Filter chats that contain all participants
  const matchingChats = chats.filter((chat) =>
    participantIds.every((participant) =>
      chat.participants.includes(participant as any)
    )
  );

  return matchingChats.length > 0 ? matchingChats : null;
};

export default { getChat, createMessage, getChatByParticipantsIds };