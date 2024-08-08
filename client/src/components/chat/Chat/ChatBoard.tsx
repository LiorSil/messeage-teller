import React from "react";
import MessageList from "./MessageList";

const ChatBoard: React.FC = () => {
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-chat-background">
        <MessageList />
      </div>
    </div>
  );
};

export default ChatBoard;
