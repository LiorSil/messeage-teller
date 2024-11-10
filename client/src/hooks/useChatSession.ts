import { useCallback } from "react";
import { useSocket } from "./useSocket";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store.ts";
import { RootState } from "../redux/store";
import { Message } from "../types/message";
import { useMessages } from "./useMessages.ts";
import { useNotification } from "./useNotification";
import { useChatInput } from "./useChatInput";
import {useContact} from "./useContact.ts";
import { fetchContact } from "../redux/thunks/contactThunks.ts";
import { initSocketEvents } from "../sockets/socketEvents";

export const useChatSession = () => {
  const dispatch: AppDispatch = useDispatch();
  const socket = useSocket();
  const { selectedChat, messages } = useSelector(
    (state: RootState) => state.chat
  );
  const { contact } = useContact();
  const { newMessages, createMessageOnScreen } = useMessages(messages);
  const createNotification = useNotification();
  const { inputValue, handleInputChange, clearInput } = useChatInput();

  // Handle receiving messages from the server
  const receiveMessage = useCallback(
    (message: Message) => {
      if (message.fromId === selectedChat?._id) {
        createMessageOnScreen(message);
      }
      createNotification(message);
      dispatch(fetchContact());
    },
    [selectedChat, createMessageOnScreen, createNotification, contact, dispatch]
  );

  // Manage socket listeners for message receiving
  const { sendMessage: emitMessage } = initSocketEvents(socket, receiveMessage, createMessageOnScreen);

  const sendMessage =useCallback( () => {
    const message: Message = {
      fromId: contact?._id || "",
      toId: selectedChat?._id || "",
      content: inputValue.trim(),
      sentTD: new Date(),
    };

    emitMessage(message);
    createMessageOnScreen(message);
    clearInput();
  }, [inputValue, contact, selectedChat, createMessageOnScreen, clearInput]);

  return {
    newMessages,
    inputValue,
    handleInputChange,
    sendMessage,
    contactId: contact?._id,
    hasActiveChat: selectedChat !== null,
  };
};
