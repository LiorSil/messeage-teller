import React from "react";
import ChatListNavBar from "./chat-list-nav-bar/ChatListNavBar";
import ChatList from "./chats-list/ChatList";

const ChatsManagerLayout = () => {
  return (
    <>
      <ChatListNavBar />
      <ChatList />
    </>
  );
};

export default ChatsManagerLayout;
