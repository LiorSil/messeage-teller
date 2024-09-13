// hooks/useChatLogic.ts
import { useState, useEffect } from "react";
import { useSocket } from "./useSocket";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Message } from "../types/message";

export const useChatLogic = () => {
  const contactId = useSelector(
    (state: RootState) => state.contact.contact?._id || ""
  );
  const socket = useSocket(contactId); // Get the socket instance
  const [messages, setMessages] = useState<Message[]>([]); // Manage chat messages
  const [inputValue, setInputValue] = useState<string>(""); // Manage input field
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );

  const contact = useSelector((state: RootState) => state.contact.contact);

  // Send a message to the server
  const sendMessage = () => {
    if (socket && inputValue.trim() && contact?._id && selectedChat?._id) {
      const message: Message = {
        fromId: contact._id,
        toId: selectedChat._id,
        content: inputValue,
        sentTD: new Date(),
      };

      socket.emit("send_message", message);
      setMessages((prevMessages) => [...prevMessages, message]);

      setInputValue(""); // Clear the input after sending
    }
  };

  // Receive messages from the server
  useEffect(() => {
    console.log("triggered");
    if (!socket) return;

    socket.on("receive_message", (message: Message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the listener on unmount
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  // Handle input changes
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return {
    messages,
    inputValue,
    handleInputChange,
    sendMessage,
    contactId,
  };
};
