import { useEffect } from "react";
import { Message } from "../types/message";
import { Socket } from "socket.io-client";

export const useSocketListener = (
  socket: Socket | null,
  handleMessageReceive: (message: Message) => void
) => {
  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", handleMessageReceive);

    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket, handleMessageReceive]);
};
