import { useState, useEffect, useCallback, useMemo } from "react";
import { useSocket } from "./useSocket";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { Message } from "../types/message";
import { updateContact } from "../redux/slices/contactSlice";

export const useChatSession = () => {
  const socket = useSocket();
  const dispatch = useDispatch<AppDispatch>();

  // Memoizing selectors to avoid unnecessary re-renders
  const messages = useSelector((state: RootState) => state.chat.messages);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const contact = useSelector((state: RootState) => state.contact.contact);

  // Memoizing messages and contact for optimal performance
  const memoizedMessages = useMemo(() => messages, [messages]);
  const memoizedContact = useMemo(() => contact, [contact]);

  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // Sync messages with Redux state and only update if necessary
  useEffect(() => {
    setNewMessages(memoizedMessages);
  }, [memoizedMessages]);

  // Send a message to the server and append it to the messages list
  const sendMessage = useCallback(() => {
    if (
      socket &&
      inputValue.trim() &&
      typeof memoizedContact?._id === "string" &&
      typeof selectedChat?._id === "string"
    ) {
      const message: Message = {
        fromId: memoizedContact._id,
        toId: selectedChat._id,
        content: inputValue,
        sentTD: new Date(),
      };

      socket.emit("send_message", message);
      setNewMessages((prevMessages) => [...prevMessages, message]);
      setInputValue(""); // Clear the input after sending
    } else {
      console.error("contactId or selectedChatId is not a string");
    }
  }, [socket, inputValue, memoizedContact, selectedChat]);

  // Handle receiving messages from the server
  const handleMessageReceive = useCallback(
    (message: Message) => {
      console.log("Received message", message);
      if (message.fromId === selectedChat?._id)
        setNewMessages((prevMessages) => [...prevMessages, message]);

      if (memoizedContact?.subContacts) {
        console.log("Handling incoming message notification");
        handleIncomingMessageNotification(message);
      }
    },
    [memoizedContact, selectedChat]
  );

  // Handle incoming message notification logic
  const handleIncomingMessageNotification = useCallback(
    (message: Message) => {
      if (!memoizedContact) return;

      const subContactIndex = memoizedContact.subContacts.findIndex(
        (subContact) => subContact._id === message.fromId
      );

      if (subContactIndex !== -1) {
        const updatedSubContacts = [...memoizedContact.subContacts];

        updatedSubContacts[subContactIndex] = {
          ...updatedSubContacts[subContactIndex],
          isIncomingMessage: true,
        };

        const updatedContact = {
          ...memoizedContact,
          subContacts: updatedSubContacts,
        };
        dispatch(updateContact(updatedContact));
      }
    },
    [memoizedContact, dispatch]
  );

  // Set up socket listener for receiving messages
  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", handleMessageReceive);
    // Clean up listener on unmount
    return () => {
      socket.off("receive_message", handleMessageReceive);
    };
  }, [socket, handleMessageReceive, selectedChat]);

  // Handle input changes
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return {
    newMessages,
    inputValue,
    handleInputChange,
    sendMessage,
    contactId: contact?._id,
  };
};
