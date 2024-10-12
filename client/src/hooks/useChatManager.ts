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
import { selectSortedSubContactsByMessages } from "../redux/selectors/contactSelector";
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

  const handleChatSelection = useCallback(
    async (selectedSubContact: SubContact | null) => {
      if (memoizedContact?._id && selectedSubContact) {
        await dispatch(getChatByParticipantsIds(memoizedContact._id));
        dispatch(toggleChatManagerView());
        await handleRemoveNotification(selectedSubContact);
        await dispatch(updateSelectedChat(selectedSubContact));
      } else {
        dispatch(updateSelectedChat(selectedSubContact || null));
      }
    },
    [memoizedContact, dispatch]
  );

  // Optimized remove notification handler with memoization

  const handleRemoveNotification = useCallback(
    async (selectedChat: SubContact | null) => {
      if (!memoizedContact || !selectedChat) return;

      const subContactIndex = memoizedContact.subContacts.findIndex(
        (subContact) => subContact._id === selectedChat._id
      );

      if (subContactIndex !== -1) {
        const updatedSubContacts = [...memoizedContact.subContacts];
        updatedSubContacts[subContactIndex] = {
          ...updatedSubContacts[subContactIndex],
          isIncomingMessage: false,
        };
        const updatedContact = {
          ...memoizedContact,
          subContacts: updatedSubContacts,
        };

        await dispatch(updateContact(updatedContact)); // Dispatch the updated contact
      }
    },
    [memoizedContact, dispatch]
  );

  return { handleChatSelection };
};
