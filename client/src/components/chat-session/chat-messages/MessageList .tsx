import React from "react";
import OutboundMessage from "./OutboundMessage";
import InboundMessage from "./InboundMessage";



const MessageList = ({ messages }: { messages: string[] }) => {
  const displayMessages = messages.map((message, index) => {
    return <OutboundMessage key={index} message={message} />;
  });

  
  return (
    <>
      <InboundMessage message="Thank you for your help." />
      {/* <OutboundMessage message="You're welcome. Have a great day!" /> */}
      {displayMessages}
    </>
  );
};

export default MessageList;
