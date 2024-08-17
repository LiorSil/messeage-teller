import React, { useEffect, useState } from "react";

import ChatLayout from "../../components/chat-session/ChatLayout";
import ChatsManagerLayout from "../../components/chat-manager/chatsManagerLayout";
import { useSocket } from "../../hooks/useSocket";

const ChatRoom: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(true);
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useSocket();

  const baseClass =
    "w-full flex flex-col h-screen bg-app-palette-sap-green-light-+40";

  const getClassNames = (isSelected: boolean, mdWidth: string) => {
    return `${baseClass} ${mdWidth} ${isSelected ? "flex" : "hidden md:flex"}`;
  };

  // Set the socekt event listeners
  useEffect(() => {
    if (socket) {
      socket.on("message", (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit("message", message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className={getClassNames(!selectedChat, "md:w-1/3")}>
        <ChatsManagerLayout />
      </div>
      <div className={getClassNames(!!selectedChat, "md:w-2/3")}>
        <ChatLayout />
      </div>
    </div>
  );
};

export default ChatRoom;
