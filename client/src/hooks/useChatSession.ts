import { useSocket } from "./useSocket";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import { RootState } from "../redux/store";
import { Message } from "../types/message";
import { useMessages } from "./useMessages.ts";
import { useNotification } from "./useNotification";
import { useSocketListener } from "./useSocketListener";
import { useChatInput } from "./useChatInput";
import useContact from "./useContact.ts";
import { useCallback } from "react";
import { fetchContact } from "../redux/thunks/contactThunks.ts";
import Cookies from "universal-cookie";

export const useChatSession = () => {
  const dispatch: AppDispatch = useDispatch();
  const socket = useSocket();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const { contact } = useContact();
  const { newMessages, createMessage } = useMessages(messages);
  const { createNotification } = useNotification();
  const { inputValue, handleInputChange, clearInput } = useChatInput();
  const cookies = new Cookies();
  const token = cookies.get("token");
  
  // Handle receiving messages from the server
  const receiveMessage = useCallback(
    (message: Message) => {
      console.log("Received message:", message);
      
      const isFromSelectedChat = message.fromId === selectedChat?._id;
      const isFromSubContact = contact?.subContacts.some(
        (subContact) => subContact._id === message.fromId
      );

      if (isFromSelectedChat) {
        createMessage(message);
      }

      if (isFromSubContact) {
        createNotification(message, contact);
      } else {
        dispatch(fetchContact(token));
      }
    },
    [selectedChat, createMessage, createNotification, contact, dispatch, token]
  );

  // Manage socket listeners for message receiving
  useSocketListener(socket, receiveMessage);

  const sendMessage = useCallback(() => {
    if (socket && inputValue.trim() && contact?._id && selectedChat?._id) {
      const message: Message = {
        fromId: contact._id,
        toId: selectedChat._id,
        content: inputValue,
        sentTD: new Date(),
      };

      socket.emit("send_message", message);
      createMessage(message);
      clearInput();
    } else {
      console.error("contactId or selectedChatId is not valid.");
    }
  }, [socket, inputValue, contact, selectedChat, createMessage, clearInput]);

  return {
    newMessages,
    inputValue,
    handleInputChange,
    sendMessage,
    contactId: contact?._id,
    hasActiveChat: selectedChat !== null,
  };
};
