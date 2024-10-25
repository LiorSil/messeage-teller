import { useSocket } from "./useSocket";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Message } from "../types/message";
import { useMessages } from "./useMessages.ts";
import { useNotification } from "./useNotification";
import { useSocketListener } from "./useSocketListener";
import { useChatInput } from "./useChatInput";

export const useChatSession = () => {
  const socket = useSocket();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const contact = useSelector((state: RootState) => state.contact.contact);

  const { newMessages, addMessage } = useMessages(messages);
  const { handleIncomingMessageNotification } =
    useNotification();
  const { inputValue, handleInputChange, clearInput } = useChatInput();

  // Handle receiving messages from the server
  const handleMessageReceive = (message: Message) => {
    console.log("Received message", message);
    if (message.fromId === selectedChat?._id) {
      addMessage(message);
    }
    handleIncomingMessageNotification(message, contact);
  };

  // Manage socket listeners for message receiving
  useSocketListener(socket, handleMessageReceive);

  const sendMessage = () => {
    if (socket && inputValue.trim() && contact?._id && selectedChat?._id) {
      const message: Message = {
        fromId: contact._id,
        toId: selectedChat._id,
        content: inputValue,
        sentTD: new Date(),
      };

      socket.emit("send_message", message);
      addMessage(message);
      clearInput();
    } else {
      console.error("contactId or selectedChatId is not valid.");
    }
  };

  return {
    newMessages,
    inputValue,
    handleInputChange,
    sendMessage,
    contactId: contact?._id,
    hasActiveChat: selectedChat !== null,
  };
};
