import React from "react";
import avatar from "../../assets/avatars/chat-header-avatar.jpg";

interface ChatHeaderProps {
  className?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ className = "" }) => {
  const name = "John Doe";

  return (
    <div className={`flex flex-col flex-auto pt-2 px-3 `}>
      <div
        className={` ${className} flex items-center p-4 mb-2 mx-3 z-10 md:rounded-2xl bg-chat-background  border-x-2 border-x-black md:mx-0 md:border-solid md:border-2 border-app-palette-muted-turquoise--50 `}
      >
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="h-8 w-8 md:h-14 md:w-14 rounded-full object-cover mr-4"
        />
        <span className="text-lg font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default ChatHeader;


