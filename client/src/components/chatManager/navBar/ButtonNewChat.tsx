import React from "react";
import icon from "../../../assets/icons/button-new-chat-icon.svg";

const ButtonNewChat: React.FC = () => {
  return (
    <button className="flex items-center text-white p-2 rounded-lg hover:bg-app-palette-cool-gray-+80">
      <img src={icon} alt="New chat" className="h-6 w-6" />
      <span className="ml-2"></span>
    </button>
  );
};

export default ButtonNewChat;
