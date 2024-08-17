import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import SendButton from "./SendButton";
import RecordButton from "./RecordButton";
import InputField from "./InputField";
import OutboundMessage from "../chat-messages/OutboundMessage";

const ChatInput = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    console.log("Input value:", inputValue);

    const newOutboundMessage = inputValue as string;
    onSendMessage(newOutboundMessage);

    setInputValue(""); // Clear input after sending if desired
  };

  return (
    <div className="  my-2 rounded-lg">
      <div
        className=" bg-gray-200 relative flex items-center border-2 rounded-md
       border-black "
      >
        <RecordButton />
        <InputField value={inputValue} onChange={handleInputChange} />
        <div className="flex bg-gray-200 items-center ml-2 rounded-md ">
          <ActionButtons />
          <SendButton onSend={handleSend} isInputEmpty={!inputValue} />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
