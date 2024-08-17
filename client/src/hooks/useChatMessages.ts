// hooks/useChatMessages.ts
import { useState } from "react";

export const useChatMessages = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return { messages, handleSendMessage };
};
