import {Socket} from "socket.io-client";
import {Message} from "../types/message";

export const initSocketEvents = (
    socket: Socket | null,
    onMessageReceived: (message: Message) => void
) => {
    if (!socket) {
      return {
        sendMessage: () => {
          console.warn("Socket is not connected.");
        },
      };
    }
    // Remove any existing listener before adding a new one to prevent duplication
    socket.off("receive_message");

    // Listen for incoming messages
    socket.on("receive_message", (message: Message) => {
        // Determine recipient based on your client logic if needed
        console.log("receive_message", message);;
        onMessageReceived(message);
    });

    // Return a sendMessage function that uses the socket
    const sendMessage = (message: Message) => {
        socket.emit("send_message", message);
    };

    return {sendMessage};
};
