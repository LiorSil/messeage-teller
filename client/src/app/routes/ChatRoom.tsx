import React, { useState } from "react";
import ChatList from "../../components/chatManager/chatList/ChatList";

import ChatHeader from "../../components/chat/ChatHeader";
import ChatInput from "../../components/chat/ChatInput";
import Profile from "../../components/chatManager/navBar/Profile";
import NavBar from "../../components/chatManager/navBar/NavBar";
import Status from "../../components/chatManager/navBar/Status";
import ChatBoard from "../../components/chat/Chat/ChatBoard";
import AddContact from "../../components/chatManager/navBar/ButtonNewChat";

const ChatRoom: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div
        className={`md:w-1/3 w-full flex flex-col ${selectedChat ? "hidden md:flex" : "flex"}`}
      >
        <NavBar onSelectChat={setSelectedChat} />

        <ChatList onSelectChat={setSelectedChat} />
      </div>
      <div
        className={`md:w-2/3 w-full flex flex-col ${selectedChat ? "flex" : "hidden md:flex"}`}
      >
        <ChatHeader name="test" avatarUrl="test" />
        <ChatBoard />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatRoom;
