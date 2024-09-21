import { useState, useEffect } from "react";
import { useSocket } from "./useSocket";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Message } from "../types/message";

export const useChatSession = () => {
  const socket = useSocket();

  // Memoize the results of useSelector to prevent unnecessary re-renders
  const { messages, selectedChat } = useSelector(
    (state: RootState) => state.chat
  );
  const contact = useSelector((state: RootState) => state.contact.contact);

  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // Sync messages with Redux state
  useEffect(() => {
    if (messages.length > 0) {
      setNewMessages(messages);
    }
  }, [messages]);

  // Send a message immediately when triggered
  const sendMessage = () => {
    // Enforce contactId to be a string
    if (
      socket &&
      inputValue.trim() &&
      typeof contact?._id === "string" &&
      typeof selectedChat?._id === "string"
    ) {
      const message: Message = {
        fromId: contact._id, // contact._id is enforced to be a string
        toId: selectedChat._id, // selectedChat._id is also enforced to be a string
        content: inputValue,
        sentTD: new Date(),
      };

      socket.emit("send_message", message);
      setNewMessages((prevMessages) => [...prevMessages, message]);
      setInputValue(""); // Clear the input after sending
    } else {
      console.error("contactId or selectedChatId is not a string");
    }
  };

  // Receive messages from the server
  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", handleMessageReceive);

    // Clean up the effect
    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket]);

  // Immediate input value change, but you can debounce any side-effects
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleMessageReceive = (message: Message) => {
    setNewMessages((prevMessages) => [...prevMessages, message]);
  };

  return {
    newMessages,
    inputValue,
    handleInputChange,
    sendMessage, // Send message immediately
    contact, // Ensure this is a string
  };
};
