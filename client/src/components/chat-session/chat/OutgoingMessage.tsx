import React from "react";

interface OutgoingMessageProps {
  message: string;
}

const OutgoingMessage: React.FC<OutgoingMessageProps> = ({ message }) => {
  return (
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600 text-lg">
              {message}
            </span>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
          alt="My profile"
          className="w-10 h-10 rounded-full order-1"
        />
      </div>
    </div>
  );
};

export default OutgoingMessage;
