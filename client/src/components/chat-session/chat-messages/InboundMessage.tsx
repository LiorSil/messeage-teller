import React from "react";
import { Message } from "../../../types/message";

interface InboundMessageProps {
  message: Message;
}

const InboundMessage: React.FC<InboundMessageProps> = ({ message }) => {

  const date = new Date(message.sentTD);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div>
            <p className="px-2  rounded-xl rounded-br-none inline-block bg-app-palette-sap-green-light--20 text-white text-lg border-2 border-black">
              {message.content}
              <br />
              <p className="text-app-palette-grey-green-light-+40 text-sm leading-6">
                {time}
              </p>
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
          alt="My profile"
          className="w-10 h-10 rounded-full order-2 border-2 border-black"
        />
      </div>
    </div>
  );
};

export default InboundMessage;
