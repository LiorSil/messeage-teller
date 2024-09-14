import React from "react";
import OutboundMessage from "./OutboundMessage";
import InboundMessage from "./InboundMessage";
import { Message } from "../../../types/message";


interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const displayMessages = messages.map((message, index) => {
    if (message.fromId === currentUserId) {
      return <OutboundMessage key={index} message={message} />;
    } else {
      return <InboundMessage key={index} message={message} />;
    }
  });

  return <>{displayMessages}</>;
};

export default MessageList;
