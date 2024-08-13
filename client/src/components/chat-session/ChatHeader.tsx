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
        className={` ${className} flex items-center p-4  mx-3 z-10 bg-app-palette-sap-green-light-+0 border-x-2 border-x-black md:mx-0 md:border-solid md:border-2 border-black`}
      >
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="rounded-full h-6 w-6 md:h-10 md:w-10 ring-2 ring-gray-300 dark:ring-gray-500  object-cover mr-4"
        />
        <span className="text-lg font-semibold">{name}</span>
      </div>
    </div>
  );
};

export default ChatHeader;


