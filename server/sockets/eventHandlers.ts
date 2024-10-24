import { Server, Socket } from "socket.io";
import { IMessage } from "../models/model.interfaces";

import {handleSendMessage} from "./handlers/messageHandler";

// Handle connection event
const handleConnection = (socket: Socket, io: Server) => {
  const contactId = socket.handshake.query.contactId as string;

  if (contactId) {
    socket.join(contactId);
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

export { handleConnection };
