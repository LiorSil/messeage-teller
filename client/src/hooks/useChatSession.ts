import { useState, useEffect } from "react";
import { useSocket } from "./useSocket";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { Message } from "../types/message";
import { updateContact } from "../redux/slices/contactSlice";

export const useChatSession = () => {
  const socket = useSocket();
  const dispatch = useDispatch<AppDispatch>();

  // Memoize the results of useSelector to prevent unnecessary re-renders
  const messages = useSelector((state: RootState) => state.chat.messages);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const contact = useSelector((state: RootState) => state.contact.contact);

  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // Sync messages with Redux state
  useEffect(() => {
    if (messages.length > 0) {
      setNewMessages(messages);
    } else {
      setNewMessages([]);
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
    // Update messages only if the message is from the selected chat
    setNewMessages((prevMessages) => {
      if (
        prevMessages.length > 0 &&
        prevMessages[0].fromId === message.fromId
      ) {
        return [...prevMessages, message];
      }
      return prevMessages; // No update if message is from another chat
    });

    // Handle subContact update if the message is from a different chat
    if (contact?.subContacts) {
      handleIncomingMessageNotification(message);
    }
  };

  // Separate function to handle the subContact notification logic
  const handleIncomingMessageNotification = (message: Message) => {
    if (!contact) return;
    const subContactIndex = contact.subContacts.findIndex(
      (subContact) => subContact._id === message.fromId
    );

    if (subContactIndex !== -1) {
      // Create a copy of subContacts and update the isIncomingMessage flag
      const updatedSubContacts = [...contact.subContacts];
      updatedSubContacts[subContactIndex] = {
        ...updatedSubContacts[subContactIndex],
        isIncomingMessage: true,
      };

      // Create a new contact object with updated subContacts
      const updatedContact = { ...contact, subContacts: updatedSubContacts };

      // Dispatch the updated contact
      dispatch(updateContact(updatedContact));
    }6
  };

  return {
    newMessages,
    inputValue,
    handleInputChange,
    sendMessage, // Send message immediately
    contact, // Ensure this is a string
  };
};
