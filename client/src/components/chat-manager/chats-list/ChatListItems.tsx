import React from "react";
import ChatItem from "./ChatItem";
import avatar from "../../../assets/avatars/chat-avatar.jpg";

type Props = {};

const ChatListItems = (props: Props) => {
  return (
    <>
      <ChatItem
        sender="John Doe"
        lastMessage="hello"
        chatTitle="meme"
        imageUrl={avatar}
      />
      <ChatItem
        sender="John Doe"
        lastMessage="hello"
        chatTitle="meme"
        imageUrl={avatar}
      />
    </>
  );
};

export default ChatListItems;
