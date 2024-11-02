import {IMessage, PartialChat, PartialContact,} from "../../models/model.interfaces";
import {Server} from "socket.io";
import {debounce} from "../../utils/debounce";
import chatService from "../../services/chatService";
import contactService from "../../services/contactService";
import {Types} from "mongoose";
import notificationService from "../../services/notificationService";

export const handleSendMessage = debounce(
  async (message: IMessage, io: Server) => {
    try {
      const chat = await getChat(message);

      if (chat._id instanceof Types.ObjectId)
        await chatService.createMessage(chat._id, message);
      else console.warn("Failed to create or retrieve the chat.");

      const contacts = await getContacts(message);
      if (!contacts) {
        console.warn("Failed to retrieve contacts");
        return;
      }
      await notifyRecipients(contacts[0]._id, contacts[1]._id);
      io.to(message.toId.toString()).emit("receive_message", message);
    } catch (error) {
      console.error("Error handling send_message:", error);
    }
  },
  300
);

const getChat = async (message: IMessage): Promise<PartialChat> => {
  return await chatService.getChat([
    new Types.ObjectId(message.fromId),
    new Types.ObjectId(message.toId),
  ]);
};

const getContacts = async (
  message: IMessage
): Promise<PartialContact[] | null> => {
  const c1 = await contactService.getContactById(message.fromId);
  const c2 = await contactService.getContactById(message.toId);

  const contacts = await Promise.all([c1, c2]).then((contacts) =>
    contacts.map((contact) => {
      if (!contact) return null;
      return {
        _id: contact._id,
        name: contact.name,
        avatar: contact.avatar,
        phoneNumber: contact.phoneNumber,
        subContacts: contact.subContacts,
      };
    })
  );

  if (contacts.some((contact) => contact === null)) return null;
  return contacts as PartialContact[];
};



const notifyRecipients = async (fromId: Types.ObjectId, recipient: Types.ObjectId) => {
  const notification = await notificationService.pushNotification(fromId, recipient);
  return notification;
}

