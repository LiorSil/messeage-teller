import { Socket, Server } from "socket.io";
import { handleSendMessage } from "./messageHandler";

export const handleConnection = (socket: Socket, io: Server) => {
  const contactId = socket.handshake.query.contactId as string;

  if (contactId) {
    socket.join(contactId);
    console.log(`Contact ${contactId} joined room ${contactId}`);
  }

  socket.on("send_message", (message) => handleSendMessage(message, io));

  socket.on("disconnect", () => {
    console.log(`Contact ${contactId} disconnected`);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
    socket.disconnect();
  });
};
