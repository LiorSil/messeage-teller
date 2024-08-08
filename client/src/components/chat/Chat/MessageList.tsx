import React from "react";
import InputMessage from "./InputMessage";
import OutputMessage from "./OutputMessage";

const MessageList: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4">
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2">
          <InputMessage message="Hey How are you today?" />
          <InputMessage message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis." />
          <OutputMessage message="I'm ok what about you?" />
          <OutputMessage message="Lorem ipsum dolor sit, amet consectetur adipisicing?" />
          <InputMessage message="Lorem ipsum dolor sit amet!" />
          <OutputMessage message="Lorem ipsum dolor sit, amet consectetur adipisicing?" />
          <InputMessage message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, in." />
        </div>
      </div>
    </div>
  );
};

export default MessageList;
