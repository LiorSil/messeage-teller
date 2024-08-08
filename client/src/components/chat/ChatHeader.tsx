import React from "react";
import avatar from "../../assets/avatars/chat-header-avatar.jpg";

interface ChatHeaderProps {
  name: string;
  avatarUrl: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = () => {
  const name = "John Doe";

  //get image form src

  return (
    <div className="flex flex-col flex-auto  px-6">
      <div className="flex items-center p-4 rounded-2xl bg-chat-background">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="h-14 w-14 rounded-full object-cover mr-4"
        />
        <span className="text-lg font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default ChatHeader;

//flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4
