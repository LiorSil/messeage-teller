import OutboundMessage from "./OutboundMessage";
import InboundMessage from "./InboundMessage";
import { Message } from "../../../types/message";
import {useScrollToBottom} from "../../../hooks/useScrollToBottom.ts";

interface MessageListProps {
  messages: Message[];
  currentUserId: string | undefined;
}


const MessageList = ({ messages, currentUserId }: MessageListProps) => {
const messagesEndRef = useScrollToBottom();
  const displayMessages = messages.map((message, index) => {
    if (message.fromId === currentUserId) {
      return <OutboundMessage key={index} message={message} />;
    } else {
      return <InboundMessage key={index} message={message} />;
    }
  });

  return <div
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
    {displayMessages}
    <div ref={messagesEndRef}/>
  </div>
};

export default MessageList;
