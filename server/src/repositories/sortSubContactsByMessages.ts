import {getContactById, updateContact} from "./contactRepo";
import { getChatsByContactId } from "./chatRepo";
import {IChat, IContact} from "../models/model.interfaces";
import {Types} from "mongoose";
import {IMessage} from "../models/model.interfaces";

import {mappedChatParticipants} from "../types/chat";

// todo: implement scenario where the contact has no subContacts
//  (when receiving a message from a new contact)
export const sortSubContactsByLatestChats = async (
    contactId: Types.ObjectId | string
) => {
    // Step 1: Fetch the contact by ID
    const contact: IContact | null = await getContactById(contactId);

    if (!contact) {
        throw new Error(`No contact found with ID ${contactId}`);
    }

    // Step 2: Fetch all chats where the contact is a participant
    const chats: IChat[] = await getChatsByContactId(contact._id);
    if (!chats || chats.length === 0) {
        return [];
    }

    // Step 3: Process the chats to get all participants, excluding the current contact
    const processedParticipants: mappedChatParticipants[] = chats.flatMap((chat) => {
        const lastMessage = getLastMessageTime(chat);

        // Remove the current contact from participants
        const otherParticipantsIds = chat.participants.filter(
            (participant) => participant.toString() !== contact._id.toString()
        );

        // Map over other participants and add lastMessageTime
        return otherParticipantsIds.map((subContactId) => ({
            subContactId,
            lastMessageTime: lastMessage?.sentTD || new Date(0), // Default to epoch if no messages
        }));
    });

    // Step 4: Map the `processedParticipants` to existing `subContacts` and add `lastMessageTime`
     contact.subContacts = contact.subContacts.map((subContact) => {
        const participantData = processedParticipants.find(
            (p) => p.subContactId.toString() ===
                subContact.subContactId.toString()
        );
        return {
            ...subContact,
            lastMessageTime: participantData ? participantData.lastMessageTime : new Date(0),
        };
    });

    // Step 5: Sort the updated subContacts by lastMessageTime
    contact.subContacts.sort((a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime());

    // Step 6: Update only the `subContacts` field in the database
    const success = await updateContact(contact._id, contact);
    if (!success) {
        throw new Error(`Failed to update contact with ID ${contact._id}`);
    }
    return contact;
};

const getLastMessageTime = (chat: IChat): IMessage | null => {
    return chat.messages.reduce((latest, current) => {
        if (!latest.sentTD || (current.sentTD && current.sentTD > latest.sentTD)) {
            return current;
        }
        return latest;
    }, {} as IMessage);
};
