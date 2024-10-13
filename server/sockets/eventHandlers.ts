import { debounce } from "../utils/debounce";
import { Server, Socket } from "socket.io";
import { IMessage } from "../models/model.interfaces";
import { IChat } from "../models/model.interfaces";
import { Types } from "mongoose";
import { logger } from "../utils/logger"; // Assuming you have a logger utility
import chatService from "../services/chatService";
import contactService from "../services/contactService";

// Handle connection event
const handleConnection = (socket: Socket, io: Server) => {
  const contactId = socket.handshake.query.contactId as string;

  if (contactId) {
    // Add the contact to their own room based on their contactId
    //console.log(`Contact ${contactId} joined room ${contactId}`);
    socket.join(contactId);
    //logger.info(`Contact ${contactId} joined room ${contactId}`);
  }

  // Listen for messages
  socket.on("send_message", (message: IMessage) =>
    handleSendMessage(message, io)
  );

  // Handle disconnection event
  socket.on("disconnect", () => {
    //logger.info(`Contact ${contactId} disconnected`);
  });

  // Error handling for socket connection
  socket.on("error", (error) => {
    //logger.error("Socket error:", error);
    socket.disconnect();
  });
};

// Handle sending a message, debounced to optimize performance
const handleSendMessage = debounce(async (message: IMessage, io: Server) => {
  try {
    //retrieve existing chat or create a new one
    const chat: IChat = await chatService.getChat([
      new Types.ObjectId(message.fromId),
      new Types.ObjectId(message.toId),
    ]);

    // Ensure the chat exists
    if (!chat || !(chat._id instanceof Types.ObjectId)) {
      //  logger.error("Failed to create or retrieve the chat.");
      return;
    }

    // Add the message to the chat on the server database
    await chatService.createMessage(chat._id, message);

    // Update the contacts' subContacts lists
    const [contact1, contact2] = await Promise.all([
      contactService.getContactById(message.fromId),
      contactService.getContactById(message.toId),
    ]);

    if (contact1 && contact2) {
      const hasUpdatedContact1 = !contact1.subContacts.includes(contact2._id);
      const hasUpdatedContact2 = !contact2.subContacts.includes(contact1._id);

      if (hasUpdatedContact1) contact1.subContacts.push(contact2._id);
      if (hasUpdatedContact2) contact2.subContacts.push(contact1._id);

      if (hasUpdatedContact1 || hasUpdatedContact2) {
        await Promise.all([
          hasUpdatedContact1
            ? contactService.updateContact(contact1._id, contact1)
            : null,
          hasUpdatedContact2
            ? contactService.updateContact(contact2._id, contact2)
            : null,
        ]);
      }
    }

    // Emit the message to the receiver's room
    io.to(message.toId.toString()).emit("receive_message", message);

    // logger.info(`Message sent to room ${message.toId.toString()}`);
  } catch (error) {
    //  logger.error("Error handling send_message:", error);
  }
}, 300);

export { handleConnection };
