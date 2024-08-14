import React, { useState } from "react";
import ChatList from "../../components/chat-manager/chats-list/ChatList";
import ChatHeader from "../../components/chat-session/ChatHeader";
import ChatInput from "../../components/chat-session/ChatInput";
import NavBar from "../../components/chat-manager/nav-bar/NavBar";
import ChatBoard from "../../components/chat-session/chat/ChatBoard";
import ChatComponent from "../../components/chat-session/ChatComp";

const ChatRoom: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(true);

  return (
    <div className=" md:h-screen flex flex-col md:flex-row bg-app-palette-sap-green-light-+40">
      <div
        className={`md:w-1/3 w-full h-screen flex flex-col ${selectedChat ? "hidden md:flex" : "flex"}`}
      >
        <NavBar onSelectChat={setSelectedChat} />
        <ChatList onSelectChat={setSelectedChat} />
      </div>
      <div
        className={`md:w-2/3 w-full flex flex-col relative ${selectedChat ? "flex" : "hidden md:flex"}`}
      >
        <ChatComponent />
      </div>
    </div>
  );
};

export default ChatRoom;
