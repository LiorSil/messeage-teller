import { createSelector } from "reselect";
import { RootState } from "../store";
import { Message } from "../../types/message";
import { Chat } from "../../types/chat";
import { Contact } from "../../types/contact";

interface SelectorResult {
  sortedSubContacts: {
    latestMessage: Message | null;
    _id: string;
    isIncomingMessage?: boolean;
    name: string;
    phoneNumber: string;
    avatar: string;
  }[];
  contact: Contact;
}

// Select chats and contacts from Redux state
const selectChats = (state: RootState) => state.chat.chats;
const selectContact = (state: RootState) => state.contact.contact;

// Function to find the latest message in a chat
const getLatestMessage = (chat: Chat | undefined) => {
  if (!chat || !chat.messages || !chat.messages.length) return null;
  return chat.messages[chat.messages.length - 1] as Message;
};

// Custom selector to combine chats and subContacts, and sort by latest messages
export const selectContactsWithLatestMessages = createSelector<
  [RootState, RootState],
  SelectorResult
>([selectChats, selectContact], (chats, contact) => {
  if (!contact || !chats || !contact.subContacts)
    return { contactsWithLatestMessages: [], contact };

  const chatMap: Record<string, Chat> = chats.reduce(
    (map: Record<string, Chat>, chat: Chat) => {
      chat.participants.forEach((participantId) => {
        map[participantId] = chat;
      });
      return map;
    },
    {}
  );

  // Combine subContacts with their latest messages
  const contactsWithLatestMessages = contact.subContacts.map((subContact) => {
    const chat = chatMap[subContact._id];
    const latestMessage = getLatestMessage(chat);
    return { ...subContact, latestMessage };
  });

  // Sort contacts by latest message timestamp
  contactsWithLatestMessages.sort((a, b) => {
    const aTimestamp =
      a.latestMessage && typeof a.latestMessage.sentTD === "string"
        ? new Date(a.latestMessage.sentTD).getTime()
        : 0;

    const bTimestamp =
      b.latestMessage && typeof b.latestMessage.sentTD === "string"
        ? new Date(b.latestMessage.sentTD).getTime()
        : 0;

    return bTimestamp - aTimestamp; // Sort in descending order
  });
  console.log("contactsWithLatestMessages", contactsWithLatestMessages);

  return { sortedSubContacts: contactsWithLatestMessages, contact };
});
