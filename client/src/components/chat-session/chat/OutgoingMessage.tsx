import React from "react";

interface OutgoingMessageProps {
  message: string;
  date: string; // Add a prop for the message date
}

const OutgoingMessage: React.FC<OutgoingMessageProps> = ({ message, date }) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          A
        </div>
        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>{message}</div>
          <div className="text-gray-400 text-xs mt-1 text-right">
            {date}
          </div>{" "}
          {/* Date hint */}
        </div>
      </div>
    </div>
  );
};

export default OutgoingMessage;
