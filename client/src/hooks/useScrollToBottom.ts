// hooks/useScrollToBottom.ts
import { useEffect, useRef } from "react";

export const useScrollToBottom = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      console.log(`scrolling to bottom`);
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return messagesEndRef;
};
