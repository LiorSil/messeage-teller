// hooks/useChat.ts
import { useDispatch, useSelector } from "react-redux";
import { updateInputValue } from "../redux/slices/chatSlice";
import { RootState } from "../redux/store";

export const useChat = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) => state.chat.inputValue);
  const messages = useSelector((state: RootState) => state.chat.messages);

  const handleInputChange = (message: string) => {
    dispatch(updateInputValue(message));
  };

  return { inputValue, messages, handleInputChange };
};
