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
    chat.participants.includes(selectedSubContact?._id)
  );

  return relevantChat ? relevantChat.messages : null;
};

/**
 *  Get sorted chats by last message date sentTD field
 * @param chats : Chat[]
 * @returns Chat[] sorted by last message date
 */

 const sortChatsByRecentMessage = (chats: Chat[]): Chat[] => {
  return chats.sort((a, b) => {
    // Get the most recent message's sentTD from each chat
    const mostRecentMessageA = a.messages.reduce((prev, current) =>
      prev.sentTD && current.sentTD && prev.sentTD > current.sentTD
        ? prev
        : current
    );

    const mostRecentMessageB = b.messages.reduce((prev, current) =>
      prev.sentTD && current.sentTD && prev.sentTD > current.sentTD
        ? prev
        : current
    );

    // Compare the sentTD dates for sorting
    if (mostRecentMessageA.sentTD && mostRecentMessageB.sentTD) {
      return (
        mostRecentMessageB.sentTD.getTime() -
        mostRecentMessageA.sentTD.getTime()
      );
    }

    return 0; // If no valid sentTD, keep original order
  });
};


export { getMessagesForSubContact, sortChatsByRecentMessage };
