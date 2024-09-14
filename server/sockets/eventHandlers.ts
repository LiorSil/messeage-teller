import { debounce } from "../utils/debounce";
import { Server, Socket } from "socket.io";
import { IMessage } from "../models/model.interfaces";
import { IChat } from "../models/model.interfaces";
import { Types } from "mongoose";
import { logger } from "../utils/logger"; // Assuming you have a logger utility
import chatService from "../services/chatService";

// Handle connection event
const handleConnection = (socket: Socket, io: Server) => {
  const contactId = socket.handshake.query.contactId as string;

  if (contactId) {
    // Add the contact to their own room based on their contactId
    console.log(`Contact ${contactId} joined room ${contactId}`);
    socket.join(contactId);
    logger.info(`Contact ${contactId} joined room ${contactId}`);
  }

  // Listen for messages
  socket.on("send_message", (message: IMessage) =>
    handleSendMessage(message, io)
  );

  // Handle disconnection event
  socket.on("disconnect", () => {
    logger.info(`Contact ${contactId} disconnected`);
  });

  // Error handling for socket connection
  socket.on("error", (error) => {
    logger.error("Socket error:", error);
    socket.disconnect();
  });
};

// Handle sending a message, debounced to optimize performance
const handleSendMessage = debounce(async (message: IMessage, io: Server) => {
  try {
    // Lazy load the chat service only when it's needed

    const chat: IChat = await chatService.createChat([
      message.fromId.toString(),
      message.toId.toString(),
    ]);

    // Ensure the chat exists
    if (!chat || !(chat._id instanceof Types.ObjectId)) {
      logger.error("Failed to create or retrieve the chat.");
      return;
    }

    // Add the message to the chat on the server database
    await chatService.createMessage(chat._id, message);

    // Emit the message to the receiver's room
    io.to(message.toId.toString()).emit("receive_message", message);
    logger.info(`Message sent to room ${message.toId.toString()}`);
  } catch (error) {
    logger.error("Error handling send_message:", error);
  }
}, 300);

export { handleConnection };
