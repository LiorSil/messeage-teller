import React from "react";
import OutboundMessage from "./OutboundMessage";
import InboundMessage from "./InboundMessage";

type Props = {};

const MessageList = (props: Props) => {
  return (
    <>
      <InboundMessage message="Thank you for your help." />
      <OutboundMessage message="You're welcome. Have a great day!" />
    </>
  );
};

export default MessageList;
