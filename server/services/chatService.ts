import chatRepo from "../repos/chatRepo";
import { IChat, IMessage } from "../models/model.interfaces";
import contactService from "./contactService";
import { sortSubContactsByLatestChats } from "../repos/sortSubContactsByMessages";
import { Types } from "mongoose";


type PartialChat = Pick<IChat, "_id" | "participants" | "messages">;

const getChat = async ([
  fromId,
  toId,
]: Types.ObjectId[]): Promise<PartialChat> => {
  const participants = await contactService.getContactsByIds([fromId, toId]);

  if (!participants || participants.length === 0) {
    throw new Error(
      "Invalid contacts. Unable to create chat with undefined or empty contacts."
    );
  }
    const chat = await chatRepo.getOrCreateChat([fromId, toId]);
  return {
    _id: chat._id,
    participants: chat.participants,
    messages: chat.messages,
  };
};

const createMessage = async (
  chatId: Types.ObjectId,
  messageData: Partial<IMessage>
): Promise<IChat | null> => {
  const newMessage = await chatRepo.pushMessage(chatId, messageData);
  await sortSubContactsByLatestChats(messageData.fromId?.toString() as any);
  await sortSubContactsByLatestChats(messageData.toId?.toString() as any);

  return newMessage;
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