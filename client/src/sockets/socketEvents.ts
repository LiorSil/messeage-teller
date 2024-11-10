import { Socket } from "socket.io-client";
import { Message } from "../types/message";
import { Contact } from "../types/contact";

export const initSocketEvents = (
  socket: Socket | null,
  onMessageReceived: (message: Message, recipient: Contact) => void,
  onMessageSent: (message: Message) => void
) => {
  // Listen for incoming messages
  socket?.on("receive_message", (message: Message) => {
    const recipient = {}; // Replace with logic to determine recipient if needed
    onMessageReceived(message, recipient as Contact);
  });

  return {
    sendMessage: (message: Message) => {
      onMessageSent(message);
      socket?.emit("send_message", message);
    },
  };
};
