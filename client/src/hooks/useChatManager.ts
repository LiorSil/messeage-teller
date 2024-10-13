import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getChatByParticipantsIds } from "../redux/thunks/chatThunks";
import { toggleChatManagerView } from "../redux/slices/chatSlice";
import { SubContact } from "../types/subContact";
import useContact from "./useContact";
import { updateSelectedChat } from "../redux/slices/chatSlice";
import { useCallback, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { updateContact } from "../redux/slices/contactSlice";
const cookies = new Cookies();

export const useChatManager = () => {
  const navigate = useNavigate();
  const token = cookies.get("token");
  const dispatch: AppDispatch = useDispatch();
  const { contact } = useContact();
  const { selectedChat } = useSelector((state: RootState) => state.chat);

  //const token = useMemo(() => token, [token]);
  //const contact = useMemo(() => contact, [contact]);

  // Handle unauthenticated access
  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
    }
  }, [token, navigate]);

  // Fetch chat when contact changes and selectedChat is null
  useEffect(() => {
    if (contact?._id && !selectedChat) {
      dispatch(getChatByParticipantsIds(contact._id));
    }
  }, [contact, selectedChat, dispatch]);

  const handleChatSelection = useCallback(
    async (selectedSubContact: SubContact | null) => {
      if (contact?._id && selectedSubContact) {
        await dispatch(getChatByParticipantsIds(contact._id));
        dispatch(toggleChatManagerView());
        await handleRemoveNotification(selectedSubContact);
        await dispatch(updateSelectedChat(selectedSubContact));
      } else {
        dispatch(updateSelectedChat(selectedSubContact || null));
      }
    },
    [contact, dispatch]
  );

  // Optimized remove notification handler with memoization

  const handleRemoveNotification = useCallback(
    async (selectedChat: SubContact | null) => {
      if (!contact || !selectedChat) return;

      const subContactIndex = contact.subContacts.findIndex(
        (subContact) => subContact._id === selectedChat._id
      );

      if (subContactIndex !== -1) {
        const updatedSubContacts = [...contact.subContacts];
        updatedSubContacts[subContactIndex] = {
          ...updatedSubContacts[subContactIndex],
          isIncomingMessage: false,
        };
        const updatedContact = {
          ...contact,
          subContacts: updatedSubContacts,
        };

        await dispatch(updateContact(updatedContact)); // Dispatch the updated contact
      }
    },
    [contact, dispatch]
  );

  return { handleChatSelection };
};
