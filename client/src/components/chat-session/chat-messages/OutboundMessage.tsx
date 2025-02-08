import { Message } from "../../../types/message";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface OutboundMessageProps {
  message: Message;
}

const OutboundMessage = ({ message }: OutboundMessageProps) => {
  const contact = useSelector((state: RootState) => state.contact.contact);
  const date = new Date(message.sentTD);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <p className="px-4 rounded-xl inline-block rounded-bl-none bg-gray-300 text-gray-600 text-lg border-2 border-black">
              {message?.content}
              <br />
              <p className="text-app-palette-cool-gray--20 text-sm leading-6 ">
                {time}
              </p>
            </p>
          </div>
        </div>
        <img
          src={contact?.avatar}
          alt="My profile"
          className="w-10 h-10 rounded-full order-1 border-2 border-black"
        />
      </div>
    </div>
  );
};

export default OutboundMessage;
