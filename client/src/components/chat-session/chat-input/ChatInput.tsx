import React from "react";
import ActionButtons from "./ActionButtons";
import SendButton from "./SendButton";
import RecordButton from "./RecordButton";
import InputField from "./InputField";

const ChatInput = () => {
  return (
    <div className=" border-gray-200 px-4 pt-4 mb-2 sm:mb-0 ">
      {" "}
      <div className="relative flex border-2 rounded-lg border-black ">
        <RecordButton />

        <InputField />

        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          {" "}
          <ActionButtons />
          <SendButton />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
