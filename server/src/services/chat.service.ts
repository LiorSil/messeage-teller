import { IChat, IContact, IMessage } from "../interfaces/model.interfaces";
import { ClientSubContact, ContactSubContact } from "../types/client.type";
import { mappedChatParticipants, Participant } from "../types/chat.type";
import {
  getChatsByContactId,
  pushMessage,
} from "../repositories/chat.repository";

import { isContactType } from "../utils/typeGuard";
import { getOrCreateChat } from "../repositories/chat.repository";
import {  getContactSubContact } from "./contact.service";
import { Types } from "mongoose";

/**
 * Create a new message in a chat.
 * @param {Pick<IChat,"_id">} chatId - The ID of the chat.
 * @param {IMessage} messageData - The message data to be added.
 * @returns {Promise<IChat | null>} - The updated chat with the new message or null if not found.
 */
export const createMessageService = async (
  chatId: Pick<IChat, "_id">,
  messageData: IMessage
): Promise<IChat | null> => {
  try {
    return await pushMessage(chatId, messageData);
  } catch (error: any) {
    console.error(`Error creating message: ${error.message}`);
    throw new Error(`Error creating message: ${error.message}`);
  }
};

/**
 * Get or create a chat by participants.
 * @param {Array<participant>} participants - Array of participant IDs.
 * @returns {Promise<IChat>} - The chat with the given participants.
 */
export const getChatByParticipants = async (
  participants: Array<Participant>
): Promise<IChat> => {
  try {
    return await getOrCreateChat(participants);
  } catch (error: any) {
    console.error(`Error getting or creating chat: ${error.message}`);
    throw new Error(`Error getting or creating chat: ${error.message}`);
  }
};

/**
 * Sort sub-contacts by the latest chat messages.
 * @param {IContact} contact - The contact whose sub-contacts need to be sorted.
 * @returns {Promise<Array<IContact>>} - Sorted sub-contacts.
 */

export const sortSubContactsByLatestChats = async (
  contact: IContact
): Promise<Array<ContactSubContact>> => {
  // Step 1: Check if the input is a valid contact
  if (!isContactType(contact)) {
    throw new Error("Invalid contact type");
  }

  // step 2: Fetch all chats for the contact and filter out the chats that the contact is not a part of
  const chats: IChat[] = await getChatsByContactId(contact._id).then(
    (chats) => {
      return chats.filter((chat) => {
        return chat.participants.some((participant) => {
          const subContactIds: Types.ObjectId[] = contact.subContacts.map(
            (subContact) => subContact.subContactId as Types.ObjectId
          );

          // Correct way to compare ObjectIds:
          return subContactIds.some((subContactId) =>
            participant.equals(subContactId)
          );
        });
      });
    }
  );

  if (!chats || chats.length === 0) {
    return [];
  }

  // Step 3: Process all participants in the chats and extract the last message time for each chat
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

  // Step 4: Sort participants by last message time
  processedParticipants.sort(
    (a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
  );

  // Step 5: Fetch sub-contacts by ID and return the result with lastMessageTime
  const sortedSubContacts = await Promise.all(
    processedParticipants.map(async ({ subContactId, lastMessageTime }) => {
      const mSubContact = await getContactSubContact(contact._id, subContactId);
      return {
        ...mSubContact,
        lastMessageTime,
      };
    })
  );

  return sortedSubContacts as Array<ContactSubContact>;
};


