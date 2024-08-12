import React from "react";

interface IncomingMessageProps {
  message: string;
  date: string; // Add a prop for the message date
}

const IncomingMessage: React.FC<IncomingMessageProps> = ({ message, date }) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          A
        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{message}</div>
          <div className="text-gray-400 text-xs mt-1">{date}</div>{" "}
          {/* Date hint */}
        </div>
      </div>
    </div>
  );
};

export default IncomingMessage;
