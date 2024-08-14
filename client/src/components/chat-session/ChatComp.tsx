import React, { useEffect, useRef } from "react";
import OutgoingMessage from "./chat/OutgoingMessage";
import IncomingMessage from "./chat/IncomingMessage";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import Messages from "./chat/Messages";

const ChatComponent: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="sticky top-0 z-10 bg-app-palette-sap-green-light-+30">
        <ChatHeader />
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        <Messages />
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 z-10 bg-app-palette-sap-green-light-+30">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatComponent;
