import {
  IChat,
  PartialChat,
  IMessage,
  PartialContact,
} from "../../models/model.interfaces";
import { Server } from "socket.io";
import { debounce } from "../../utils/debounce";
import chatService from "../../services/chatService";
import contactService from "../../services/contactService";
import { Types } from "mongoose";

export const handleSendMessage = debounce(
  async (message: IMessage, io: Server) => {
    try {
      const chat = await getChat(message);

      if (chat._id instanceof Types.ObjectId)
        await chatService.createMessage(chat._id, message);
      else console.warn("Failed to create or retrieve the chat.");

      const contacts = await getContacts(message);
      if(!contacts){
        console.warn("Failed to retrieve contacts")
        return;
      }
      await updateContacts(contacts[0], contacts[1]);
      io.to(message.toId.toString()).emit("receive_message", message);
    } catch (error) {
      console.error("Error handling send_message:", error);
    }
  },
  300
);

const getChat = async (message: IMessage): Promise<PartialChat> => {
  const chat = await chatService.getChat([
    new Types.ObjectId(message.fromId),
    new Types.ObjectId(message.toId),
  ]);
  return chat;
};

const getContacts = async (message: IMessage) => {
  const contacts = await Promise.all([
    contactService.getContactById(message.fromId),
    contactService.getContactById(message.toId),
  ]).then (contacts => contacts.map(contact => {    
    if (!contact) return null;
    return {
      _id: contact._id,
      name: contact.name,
      avatar: contact.avatar,
      phoneNumber: contact.phoneNumber,
      subContacts: contact.subContacts,
    };
  }));
  if (contacts.some((contact) => contact === null)) return null;
  return contacts;
  };

const updateContacts = async (
  contact1: PartialContact | null,
  contact2: PartialContact | null
) => {
  if (!contact1 || !contact2) return;
  const updates = [
    updateContactIfNeeded(contact1, contact2._id),
    updateContactIfNeeded(contact2, contact1._id),
  ].filter(Boolean); // Remove `null` entries
  await Promise.all(updates);
};

const updateContactIfNeeded = (
  contact: PartialContact,
  subContactId: Types.ObjectId
) => {
  if (contact.subContacts.includes(subContactId)) return null;
  contact.subContacts.push(subContactId);
  return contactService.updateContact(contact._id, contact);
};
