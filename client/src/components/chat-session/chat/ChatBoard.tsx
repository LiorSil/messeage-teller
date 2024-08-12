import React from "react";
import MessageList from "./Messages";

interface ChatBoardProps {
  className?: string;
}

const ChatBoard: React.FC<ChatBoardProps> = ({ className = "" }) => {
  return (
    <div className={`flex-grow ${className} rounded-2xl py-2 px-3`}>
      <div
        className="flex flex-col h-full rounded-2xl border-solid border-2 my-6 md:my-0 border-app-palette-muted-turquoise--50 bg-chat-background overflow-hidden 
      "
      >
        <MessageList className="flex-grow overflow-y-auto" />
      </div>
    </div>
  );
};

export default ChatBoard;
