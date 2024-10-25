import { useState, useCallback } from "react";

export const useChatInput = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const clearInput = useCallback(() => {
    setInputValue("");
  }, []);

  return { inputValue, handleInputChange, clearInput };
};
