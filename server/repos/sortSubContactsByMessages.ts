import { IChat, IContact } from "../models/model.interfaces";
import { IMessage } from "../models/model.interfaces";
import contactRepo from "./contactRepo";
import chatRepo from "./chatRepo";
import { Types } from "mongoose";

export const sortSubContactsByLatestChats = async (
  contactId: Types.ObjectId | string
) => {
  // Step 1: Fetch the contact by ID
  const contact = await contactRepo.getContactById(contactId);
  if (!contact) {
    throw new Error(`Contact with ID ${contactId} not found.`);
  }

  // Step 2: Fetch all chats where the contact is a participant
  const chats: IChat[] = await chatRepo.contactChats(contact._id);
  if (!chats || chats.length === 0) {
    return [];
  }

  // Step 3: Process the chats to get all participants, excluding the current contact
  const processedParticipants = chats.flatMap((chat) => {
    // Use getLastMessageTime to get the most recent message
    const lastMessage = getLastMessageTime(chat);

    // Remove the current contact from participants
    const otherParticipants = chat.participants.filter(
      (participant) => participant.toString() !== contact._id.toString()
    );

    // Map over other participants and add lastMessageTime
    return otherParticipants.map((participant) => ({
      participantId: participant,
      lastMessageTime: lastMessage?.sentTD || new Date(0), // Default to epoch if no messages
    }));
  });

  //Step 4: Debugging: Check the final processed participants
  // console.log(
  //   "Processed participants with last message time:",
  //   processedParticipants
  // );
  // step 5: update the order of contactId's subContacts based on the last message time
  contact.subContacts = processedParticipants.map(
    (participant) => participant.participantId
  );

  // Step 6: Save the contact
  const success = await contactRepo.updateContact(contactId, contact);
  if (!success) {
    throw new Error(`Failed to update contact with ID ${contactId}`);
  } 

  return processedParticipants;
};
const getLastMessageTime = (chat: IChat): IMessage | null => {
  return chat.messages.reduce((latest, current) => {
    if (!latest.sentTD || (current.sentTD && current.sentTD > latest.sentTD)) {
      return current;
    }
    return latest;
  }, {} as IMessage);
};
