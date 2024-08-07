import React from "react";

interface ChatItemProps {
  imageUrl: string;
  chatTitle: string;
  lastMessage: string;
  sender: string;
}

const ChatItem: React.FC<ChatItemProps> = ({
  imageUrl,
  chatTitle,
  lastMessage,
  sender,
}) => {
  return (
    <div className="flex flex-row py-4 px-2 items-center border-b-2">
      <div className="w-1/4">
        <img
          src={imageUrl}
          className="object-cover h-12 w-12 rounded-full"
          alt={chatTitle}
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{chatTitle}</div>
        <span className="text-gray-500">
          {sender} : {lastMessage}
        </span>
      </div>
    </div>
  );
};

export default ChatItem;
