import React from "react";
import OutboundMessage from "./OutboundMessage";
import InboundMessage from "./InboundMessage";
import { Message } from "../../../types/message";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  console.log("messages", messages);
  const displayMessages = messages.map((message, index) => {
    return <OutboundMessage key={index} message={message} />;
  });

  return (
    <>
      {/* <OutboundMessage message="You're welcome. Have a great day!" /> */}
      {displayMessages}
    </>
  );
};

export default MessageList;
