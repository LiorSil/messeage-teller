import React from "react";

interface SendButtonProps {
  onSend: () => void;
  isInputEmpty: boolean;
}

const SendButton = ({ onSend, isInputEmpty }: SendButtonProps) => {
  return (
    <button
      onClick={onSend}
      disabled={isInputEmpty}
      type="button"
      className={`inline-flex rounded-l-md rounded-sm px-4 py-3  transition duration-500 ease-in-out text-white focus:outline-none  disabled:bg-gray-400 disabled:cursor-not-allowed
       ${isInputEmpty ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-400"} `}
    >
      <span className="font-bold">Send</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-6 w-6 ml-2 transform rotate-90"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
      </svg>
    </button>
  );
};

export default SendButton;
