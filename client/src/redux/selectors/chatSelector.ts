import { Chat } from "../../types/chat";
import { Message } from "../../types/message";
import { SubContact } from "../../types/subContact";

/**
 * Get messages for a sub-contact
 * @param chats : Chat[]
 * @param selectedSubContact : SubContact
 * @returns
 */
const getMessagesForSubContact = (
  chats: Chat[],
  selectedSubContact: SubContact
): Message[] | null => {
  const relevantChat = chats.find((chat) =>
    chat.participants.includes(selectedSubContact._id)
  );

  return relevantChat ? relevantChat.messages : null;
};

export { getMessagesForSubContact };
