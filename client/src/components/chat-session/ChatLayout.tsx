import React from "react";
import ChatHeader from "./chat-header/ChatHeader";
import MessageList from "./chat-messages/MessageList ";
import ChatInput from "./chat-input/ChatInput";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";
import { useChatMessages } from "../../hooks/useChatMessages";

const ChatLayout: React.FC = () => {
  const messagesEndRef = useScrollToBottom();
  const { messages, handleSendMessage } = useChatMessages();

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="sticky top-0 z-10 bg-app-palette-sap-green-light-+30">
        <ChatHeader />
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
      >
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 z-10 bg-app-palette-sap-green-light-+30">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatLayout;