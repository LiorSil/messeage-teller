import React from "react";
import OutboundMessage from "./OutboundMessage";
import InboundMessage from "./InboundMessage";
import { Message } from "../../../types/message";


interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  console.log("messages", messages);
  const displayMessages = messages.map((message, index) => {

    if (message.fromId === currentUserId) {
      return <OutboundMessage key={index} message={message} />;
    } else {
      return <InboundMessage key={index} message={message} />;
    }
  });

  return (
    <>
      {/* <OutboundMessage message="You're welcome. Have a great day!" /> */}
      {displayMessages}
    </>
  );
};

export default MessageList;
