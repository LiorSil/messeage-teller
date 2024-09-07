import React from "react";
import { Message } from "../../../types/message";

interface OutboundMessageProps {
  message: Message;
}

const OutboundMessage = ({ message }: OutboundMessageProps) => {
  console.log("Outbound message", message);
  return (
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-xl inline-block rounded-bl-none bg-gray-300 text-gray-600 text-lg border-2 border-black">
              {message?.content}
            </span>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
          alt="My profile"
          className="w-10 h-10 rounded-full order-1 border-2 border-black"
        />
      </div>
    </div>
  );
};

export default OutboundMessage;
