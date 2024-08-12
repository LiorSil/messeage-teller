import React from "react";
import InputMessage from "./IncomingMessage";
import OutputMessage from "./OutgoingMessage";

interface MessagesProps {
  className?: string;
}

const Messages: React.FC<MessagesProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col h-full ${className} p-4 `}>
      <div className="grid grid-cols-12 gap-y-2">
        <InputMessage
          date="2024-08-09 10:45 AM"
          message="Hey How are you today?"
        />
        <InputMessage
          message="Lorem ipsum dolor sit hello, consectetur adipisicing elit. Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis."
          date="2024-08-09 10:45 AM"
        />
        <OutputMessage
          message="I'm ok what about you?"
          date="2024-08-09 10:50 AM"
        />
        <OutputMessage
          message="Lorem ipsum dolor sit, hello consectetur adipisicing?"
          date="2024-08-09 10:50 AM"
        />
        <InputMessage
          message="Lorem ipsum dolor sit hello!"
          date="2024-08-09 10:45 AM"
        />
        <OutputMessage
          message="Lorem ipsum dolor sit, hello consectetur adipisicing?"
          date="2024-08-09 10:50 AM"
        />
        <InputMessage
          message="Lorem ipsum dolor sit hello consectetur adipisicing elit. 
          Perspiciatis, in."
          date="2024-08-09 10:45 AM"
        />
        <OutputMessage
          message="Lorem ipsum dolor sit, hello consectetur adipisicing?"
          date="2024-08-09 10:50 AM"
        />
        <InputMessage
          message="Lorem ipsum dolor sit hello consectetur adipisicing elit. 
          Perspiciatis, in."
          date="2024-08-09 10:45 AM"
        />
        <OutputMessage
          message="Lorem ipsum dolor sit, hello consectetur adipisicing?"
          date="2024-08-09 10:50 AM"
        />
      </div>
    </div>
  );
};

export default Messages;
