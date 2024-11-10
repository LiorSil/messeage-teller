import { useState, useEffect, useCallback } from "react";
import { Message } from "../types/message";

export const useMessages = (messages: Message[]) => {
  const [newMessages, setNewMessages] = useState<Message[]>([]);

  // Sync messages with the Redux state
  useEffect(() => {
    setNewMessages(messages);
  }, [messages]);

  const createMessageOnScreen = useCallback((message: Message) => {
    setNewMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  return { newMessages, createMessageOnScreen };
};
