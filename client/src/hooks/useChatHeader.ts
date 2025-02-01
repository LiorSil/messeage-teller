import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { toggleChatManagerView } from "../redux/slices/chatSlice";
import { SubContact } from "../types/subContact";
import axiosInstance from "../api/axiosInstance";
import { updateContact } from "../redux/slices/contactSlice";

export const useChatHeader = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const { contact } = useSelector((state: RootState) => state.contact);
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

  const deleteSubContact = async (subContact: SubContact) => {
    if (!contact) {
      return;
    }
    const updatedContact = {
      ...contact,
      subContacts: contact.subContacts.filter(
        (sub) => sub._id !== subContact._id
      ),
    };

    try {
      const response = await axiosInstance.put(
        "/contacts/fetchModifySubContact",
        {
          data: { subContactId: subContact._id, actionType: "delete" },
        }
      );
      if (response.status === 200) {
        console.log(`status 200`);
        dispatch(updateContact(updatedContact));
        window.alert("Sub contact deleted successfully!");
      } else {
        window.alert("Failed to save changes. Please try again.");
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error);
      window.alert("Failed to save changes. Please try again.");
    }
  };

  // Return the screen size state
  return {
    isSmallScreen,
    handleReturnButtonClick,
    selectedChat,
    deleteSubContact,
  };
};
