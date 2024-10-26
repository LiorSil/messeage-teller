import { createSelector } from "reselect";
import { RootState } from "../store";
import { Message } from "../../types/message";
import { Chat } from "../../types/chat";
import { Contact } from "../../types/contact";

interface SubContactWithMessage {
  latestMessage: Message | null;
  _id: string;
  isIncomingMessage?: boolean;
  name: string;
  phoneNumber: string;
  avatar: string;
}

interface SelectorResult {
  contact: Contact;
  sortedSubContacts: SubContactWithMessage[];
}

// Select chats and contacts from Redux state
const selectChats = (state: RootState) => state.chat.chats;
const selectContact = (state: RootState) => state.contact.contact;
const getLatestMessage = (chat: Chat): Message => {
  return chat.messages[chat.messages.length - 1];
};

// Custom selector to combine chats and subContacts, and sort by latest messages
export const selectContactsWithLatestMessages = createSelector<
  [RootState, RootState],
  SelectorResult
>([selectChats, selectContact], (chats: Chat[], contact: Contact) => {
  const chatMap: Record<string, Chat> = chats.reduce(
    (map, chat) => {
      chat.participants.forEach((participantId) => {
        map[participantId] = chat;
      });
      return map;
    },
    {} as Record<string, Chat>
  );

  // Update subContacts with their latest messages
  const updatedSubContacts: SubContactWithMessage[] = contact.subContacts.map(
    (subContact) => {
      const chat = chatMap[subContact._id];
      if (!chat) {
        return { ...subContact, latestMessage: null };
      }
      const latestMessage = getLatestMessage(chat);
      return { ...subContact, latestMessage };
    }
  );

  // Sort subContacts by the latest message timestamp (descending)
  const sortedSubContacts = [...updatedSubContacts].sort((a, b) => {
    const aTimestamp = a.latestMessage?.sentTD
      ? new Date(a.latestMessage.sentTD).getTime()
      : 0; // Fallback to 0 if no sentTD

    const bTimestamp = b.latestMessage?.sentTD
      ? new Date(b.latestMessage.sentTD).getTime()
      : 0; // Fallback to 0 if no sentTD

    return bTimestamp - aTimestamp; // Sort in descending order
  });

  const updatedContact: Contact = {
    ...contact,
    subContacts: sortedSubContacts,
  };

  return { contact: updatedContact };
});
