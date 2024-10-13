import React from "react";
import ChatHeader from "./chat-header/ChatHeader";
import MessageList from "./chat-messages/MessageList";
import ChatInput from "./chat-input/ChatInput";
import { useScrollToBottom } from "../../hooks/useScrollToBottom";
import { useChatSession } from "../../hooks/useChatSession";

const ChatSessionLayout = () => {
  const messagesEndRef = useScrollToBottom();

  const {
    newMessages,
    inputValue,
    handleInputChange,
    sendMessage,
    contactId,
    hasActiveChat,
  } = useChatSession();

  return (
    <div className="flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
      {hasActiveChat ? (
        <>
          <div className="sticky top-0 z-10 bg-app-palette-sap-green-light-+30">
            <ChatHeader />
          </div>
          <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            <MessageList messages={newMessages} currentUserId={contactId} />
            <div ref={messagesEndRef} />
          </div>
          <div className="sticky bottom-0 z-10 bg-app-palette-sap-green-light-+30">
            <ChatInput
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onSendMessage={sendMessage}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center flex-col h-full text-center text-gray-500">
          <div className="mb-4">
            {/* Placeholder icon, you can add a graphic or an emoji */}
            <svg
              className="w-16 h-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z"
              />
            </svg>
          </div>
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(ChatSessionLayout);
