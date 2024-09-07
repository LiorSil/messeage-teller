// hooks/useChat.ts
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, updateInputValue } from "../redux/slices/chatSlice";
import { RootState } from "../redux/store";

export const useChat = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) => state.chat.inputValue);
  const messages = useSelector((state: RootState) => state.chat.messages);

  const handleInputChange = (message: string) => {
    dispatch(updateInputValue(message));
  };

  const handleSendMessage = () => {
    dispatch(sendMessage());
  };

  return { inputValue, messages, handleInputChange, handleSendMessage };
};
