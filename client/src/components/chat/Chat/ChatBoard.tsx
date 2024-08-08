import React from "react";
import MessageList from "./MessageList";

const ChatBoard: React.FC = () => {
  return (
    <div className="flex flex-col flex-auto h-full py-2 px-3  ">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl  border-solid border-2 border-app-palette-muted-turquoise--50 bg-chat-background">
        <MessageList />
      </div>
    </div>
  );
};

export default ChatBoard;
