import React, { useState } from "react";
import ChatList from "../../components/chatManager/chatList/ChatList";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatInput from "../../components/chat/ChatInput";
import NavBar from "../../components/chatManager/navBar/NavBar";
import ChatBoard from "../../components/chat/Chat/ChatBoard";

const ChatRoom: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

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
        <ChatHeader className="flex-none h-16 md:relative fixed top-0 left-0 right-0  " />
        <ChatBoard className="flex-grow overflow-y-auto pb-16 md:pb-0" />
        <ChatInput className=" flex-none h-16 md:relative fixed bottom-0 left-0 right-0" />{" "}
        {/* Fix to bottom on phone mode */}
      </div>
    </div>
  );
};

export default ChatRoom;
