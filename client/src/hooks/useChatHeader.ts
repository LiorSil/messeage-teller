import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { toggleChatManagerView } from "../redux/slices/chatSlice";

export const useChatHeader = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const dispatch: AppDispatch = useDispatch();

  const handleReturnButtonClick = () => {
    dispatch(toggleChatManagerView());
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  // Return the screen size state
  return {
    isSmallScreen,
    handleReturnButtonClick,
    selectedChat,
    
  };
};
