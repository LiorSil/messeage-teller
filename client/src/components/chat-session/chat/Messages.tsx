import React from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";

type Props = {};

const Messages = (props: Props) => {
  return (
    <>
      <OutgoingMessage message="Hello, how can I help you today?" />
      <OutgoingMessage message="I'm here to help you with any questions you may have." />
      <IncomingMessage message="I have a question about my account." />
      <OutgoingMessage message="Sure, I can help you with that." />
      <IncomingMessage message="I'm having trouble logging in." />
      <OutgoingMessage message="I can help you with that. Please provide me with your email address." />
      <IncomingMessage message="My email address is" />
      <OutgoingMessage message="Thank you. I will look up your account now." />
      <OutgoingMessage message="I have found your account. Please provide me with your username." />
      <IncomingMessage message="My username is" />

      <IncomingMessage message="Thank you for your help." />
      <OutgoingMessage message="You're welcome. Have a great day!" />
      <IncomingMessage message="I'm having trouble logging in." />
      <OutgoingMessage message="I can help you with that. Please provide me with your email address." />
      <IncomingMessage message="My email address is" />
      <OutgoingMessage message="Thank you. I will look up your account now." />
      <OutgoingMessage message="I have found your account. Please provide me with your username." />
      <IncomingMessage message="My username is" />

      <IncomingMessage message="Thank you for your help." />
      <OutgoingMessage message="You're welcome. Have a great day!" />
    </>
  );
};

export default Messages;
