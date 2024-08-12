import React from "react";
import ChatListItems from "./ChatListItems";

type Props = {
  onSelectChat: (chatId: string) => void;
};

const ChatList: React.FC<Props> = ({ onSelectChat }) => {
  return (
    <>
      <ChatListItems onSelectChat={onSelectChat} />
    </>
  );
};

export default ChatList;
