import { IChat, IContact, IMessage } from "../interfaces/model.interfaces";
import { getChatsByContactId, pushMessage } from "../repositories/chat.repository";
import { Types } from "mongoose";
import { getOrCreateChat } from "../repositories/chat.repository";
import { getContactByIdService } from "./contact.service";
import { mappedChatParticipants } from "../types/chat.type";
import { isContactType } from "../utils/typeGuard";

export const createMessageService = async (
  chatId: Types.ObjectId,
  messageData: IMessage
): Promise<IChat | null> => {
  const newMessage = await pushMessage(chatId, messageData);
  return newMessage;
};

export const getChatByParticipants = async (participants: Types.ObjectId[]) => {
  const chat = await getOrCreateChat(participants);

  return chat;
};

export const sortSubContactsByLatestChats = async (contact: IContact) => {
  if (!isContactType(contact)) {
    throw new Error("Invalid contact type");
  }

  // Fetch chats once and check for validity
  const chats: IChat[] = await getChatsByContactId(contact._id);
  if (!chats || chats.length === 0) {
    return [];
  }

  // Process the participants from all chats
  const processedParticipants: mappedChatParticipants[] = chats.flatMap(
    (chat) => {
      const lastMessage = chat.messages[chat.messages.length - 1];
      const lastMessageTime = lastMessage?.sentTD || new Date(0);

      return chat.participants
        .filter((participant) => !participant.equals(contact._id))
        .map((subContactId) => ({
          subContactId,
          lastMessageTime,
        }));
    }
  );

  // Step 1: Sort participants by the last message time in descending order
  processedParticipants.sort(
    (a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
  );

  // Step 2: Resolve contact details for all subContacts in parallel
  const sortedSubContacts = await Promise.all(
    processedParticipants.map(async ({ subContactId, lastMessageTime }) => {
      const mSubContact = await getContactByIdService(subContactId);
      return {
        ...mSubContact,
        lastMessageTime, // Ensure we return lastMessageTime in the result if needed
      };
    })
  );

  return sortedSubContacts;
};

