import { useState, useEffect, useCallback } from "react";
import { Message } from "../types/message";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";

export const useMessages = () => {
  const {  messages } = useSelector((state: RootState) => state.chat);
  const [newMessages, setNewMessages] = useState<Message[]>(messages);

    useEffect(() => {
        setNewMessages(messages);
    }, [messages]);


  const createMessageOnScreen = useCallback((message: Message) => {
    setNewMessages((prevMessages) => [...prevMessages, message]);
  }, [
    setNewMessages,
  ]);

  return { newMessages, createMessageOnScreen };
};
