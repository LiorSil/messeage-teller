import React from "react";
import ChatItem from "./ChatItem";

type Props = {};

const ChatListItems = (props: Props) => {
  return (
    <>
      <ChatItem
        sender="John Doe"
        lastMessage="hello"
        chatTitle="meme"
        imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <ChatItem
        sender="John Doe"
        lastMessage="hello"
        chatTitle="meme"
        imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </>
  );
};

export default ChatListItems;
