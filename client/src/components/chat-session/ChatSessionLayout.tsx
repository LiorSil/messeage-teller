import React from "react";
import ChatHeader from "./chat-header/ChatHeader";
import MessageList from "./chat-messages/MessageList";
import ChatInput from "./chat-input/ChatInput";
import {useChatSession} from "../../hooks/useChatSession";

const ChatSessionLayout = () => {

    const {
        newMessages,
        inputValue,
        handleInputChange,
        sendMessage,
        contactId,
        hasActiveChat,
    } = useChatSession();
    const containerClassNames = "flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen";


    return (
        <div className={containerClassNames}>
            {hasActiveChat && (
                <>
                    <ChatHeader/>
                    <MessageList
                        messages={newMessages}
                        currentUserId={contactId}
                    />
                    <ChatInput
                        inputValue={inputValue}
                        onInputChange={handleInputChange}
                        onSendMessage={sendMessage}
                    />
                </>
            )}
            {!hasActiveChat }
        </div>
    );
};

export default React.memo(ChatSessionLayout);
