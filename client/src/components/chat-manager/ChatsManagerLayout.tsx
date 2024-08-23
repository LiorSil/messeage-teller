import React from "react";
import NavBar from "./chat-list-nav-bar/nav-bar/NavBar";
import ChatList from "./chats-list/ChatList";

const ChatsManagerLayout = () => {
  return (
    <>
      <NavBar />
      <ChatList />
    </>
  );
};

export default ChatsManagerLayout;
