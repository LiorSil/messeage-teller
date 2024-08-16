import React, { useState } from "react";
import ChatList from "../../components/chat-manager/chats-list/ChatList";
import ChatListNavBar from "../../components/chat-manager/chat-list-nav-bar/ChatListNavBar";
import ChatLayout from "../../components/chat-session/ChatLayout";
import ChatsManagerLayout from "../../components/chat-manager/chatsManagerLayout";

const ChatRoom: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(true);

  const baseClass =
    "w-full flex flex-col h-screen bg-app-palette-sap-green-light-+40";

  const getClassNames = (isSelected: boolean, mdWidth: string) => {
    return `${baseClass} ${mdWidth} ${isSelected ? "flex" : "hidden md:flex"}`;
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
