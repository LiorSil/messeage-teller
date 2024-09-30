import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getChatByParticipantsIds } from "../redux/thunks/chatThunks";
import { toggleChatManagerView } from "../redux/slices/chatSlice";
import { SubContact } from "../types/subContact";
import useContact from "./useContact";
import { updateSelectedChat } from "../redux/slices/chatSlice";
import { useEffect, useMemo } from "react";
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

  const memoizedToken = useMemo(() => token, [token]);
  const memoizedContact = useMemo(() => contact, [contact]);

  // Handle unauthenticated access
  useEffect(() => {
    if (!memoizedToken) {
      navigate("/unauthorized");
    }
  }, [memoizedToken, navigate]);

  // Fetch chat when contact changes and selectedChat is null
  useEffect(() => {
    if (memoizedContact?._id && !selectedChat) {
      dispatch(getChatByParticipantsIds(memoizedContact._id));
    }
  }, [memoizedContact, selectedChat, dispatch]);

  // Update selected chat to the first subContact when the contact is updated
  useEffect(() => {
    if (memoizedContact?.subContacts?.length) {
      const firstSubContact = memoizedContact.subContacts[0];
      dispatch(updateSelectedChat(firstSubContact));
    }
  }, [memoizedContact, dispatch]);

  const handleChatSelection = async (selectedSubContact: SubContact | null) => {
    if (contact?._id && selectedSubContact) {
      await dispatch(getChatByParticipantsIds(contact._id)); // Ensure this is done before switching views
      await dispatch(toggleChatManagerView());
      await handleRemoveNotification(selectedSubContact);
      await dispatch(updateSelectedChat(selectedSubContact)); // This should be called after the notification is removed
    } else {
      dispatch(updateSelectedChat(selectedSubContact || null));
    }
  };

  const handleRemoveNotification = async (selectedChat: SubContact | null) => {
    if (!contact || !selectedChat) return;

    const subContactIndex = contact.subContacts.findIndex(
      (subContact) => subContact._id === selectedChat._id
    );

    if (subContactIndex !== -1) {
      // Create a copy of subContacts and update the isIncomingMessage flag
      const updatedSubContacts = [...contact.subContacts];
      updatedSubContacts[subContactIndex] = {
        ...updatedSubContacts[subContactIndex],
        isIncomingMessage: false,
      };
      const updatedContact = { ...contact, subContacts: updatedSubContacts };

      dispatch(updateContact(updatedContact)); // Dispatch the updated contact
    }
  };

  return { handleChatSelection };
};
