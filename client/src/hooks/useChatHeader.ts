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
      setIsSmallScreen(window.innerWidth < 768); // Tailwind's "md" breakpoint is 768px
    };

    // Call handleResize initially to set the initial state
    handleResize();

    // Add event listener to listen for window resizing
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return the screen size state
  return { isSmallScreen, handleReturnButtonClick, selectedChat };
};
