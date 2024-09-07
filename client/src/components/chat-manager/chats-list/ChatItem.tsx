import React from "react";

interface ChatItemProps {
  contactName: string;
  lastMessage: string;
  imageUrl: string;
  onSelectChatItem: () => void;
}

const ChatItem = ({
  contactName,
  lastMessage,
  imageUrl,
  onSelectChatItem,
}: ChatItemProps) => {
  return (
    <div
      onClick={onSelectChatItem}
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
    >
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img
          src={imageUrl}
          alt={`${contactName}'s Avatar`}
          className="w-12 h-12 rounded-full border-2 border-black object-cover object-center"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{contactName}</h2>
        <p className="text-gray-600 ">{lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatItem;
