import { useEffect } from "react";
import { Message } from "../types/message";
import { Socket } from "socket.io-client";
import { Contact } from "../types/contact";

export const useSocketListener = (
  socket: Socket | null,
  receiveMessage: (message: Message, recipient: Contact) => void
 
) => {
  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", receiveMessage);

    return () => {
      socket.off("receive_message", receiveMessage);
     
    };
  }, [socket, receiveMessage ]);
};
