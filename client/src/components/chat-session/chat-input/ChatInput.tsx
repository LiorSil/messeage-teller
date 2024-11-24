import React from "react";
import ActionButtons from "./ActionButtons";
import SendButton from "./SendButton";
import RecordButton from "./RecordButton";
import InputField from "./InputField";

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void; // Ensure this fires immediately
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
}) => {
  return (
      <div className="sticky bottom-0 z-10 bg-app-palette-sap-green-light-+30">

        <div className="my-2 rounded-lg">
          <div className="bg-gray-200 relative flex items-center border-2 rounded-md border-black">
            <RecordButton/>
            <InputField value={inputValue} onChange={onInputChange}/>
            <div className="flex bg-gray-200 items-center ml-2 rounded-md ">
              <ActionButtons/>
              <SendButton onSend={onSendMessage} isInputEmpty={!inputValue}/>
            </div>
          </div>
        </div>
      </div>
        );
        };

        export default ChatInput;
