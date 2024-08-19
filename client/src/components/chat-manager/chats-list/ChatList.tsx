import React from "react";
import ChatListItems from "./ChatListItems";

const ChatList: React.FC = () => {
  return (
    <div className="overflow-y-auto h-screen p-3 mb-9 pb-6">
      <ChatListItems />
      <div className="flex justify-center items-center mt-4">
        <p className="text-center">
          <span className="text-gray-800 bg-white">You have no more chats</span>
        </p>
      </div>
    </div>
  );
};

export default ChatList;
