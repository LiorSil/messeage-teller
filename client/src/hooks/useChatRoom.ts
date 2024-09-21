import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import useContact from "./useContact";
import { SubContact } from "../types/subContact";
import { updateSelectedChat } from "../redux/slices/chatSlice";
import { getChatByParticipantsIds } from "../redux/thunks/chatThunks";
import { BASE_CHAT_CLASS } from "../utils/styles/tailwindClasses";

const cookies = new Cookies();

export const useChatRoom = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { contact } = useContact();

  const token = cookies.get("token");

  const { selectedChat, chats, messages } = useSelector(
    (state: RootState) => state.chat
  );

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
    } else if (contact?._id && !selectedChat) {
      dispatch(getChatByParticipantsIds(contact._id));
    }
  }, [token, navigate, dispatch, contact, selectedChat]);

  useEffect(() => {
    if (contact?.subContacts?.length && !selectedChat) {
      const firstSubContact = contact.subContacts[0];
      dispatch(updateSelectedChat(firstSubContact));
    }
  }, [contact, selectedChat, dispatch]);

  const handleChatSelection = (selectedSubContact: SubContact | null) => {
    if (
      contact?._id &&
      selectedSubContact &&
      selectedSubContact !== selectedChat
    ) {
      dispatch(getChatByParticipantsIds(contact._id));
    }
    dispatch(updateSelectedChat(selectedSubContact || null));
  };

  const getClassNames = useMemo(
    () => (isSelected: boolean, mdWidth: string) => {
      return `${BASE_CHAT_CLASS} ${mdWidth} ${isSelected ? "flex" : "hidden md:flex"}`;
    },
    []
  );

  return {
    contact,
    selectedChat,
    handleChatSelection,
    getClassNames,
    token,
    messages,
    chats,
  };
};
