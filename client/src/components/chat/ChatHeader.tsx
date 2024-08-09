import React from "react";
import avatar from "../../assets/avatars/chat-header-avatar.jpg";

interface ChatHeaderProps {
  name: string;
  avatarUrl: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = () => {
  const name = "John Doe";

  //get image form src

  //className="flex-none h-16"
  return (
    <div className="flex flex-col flex-auto pt-2 px-3">
      <div className="flex items-center p-4 mb-2 rounded-2xl bg-chat-background border-solid border-2 border-app-palette-muted-turquoise--50">
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
