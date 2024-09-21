import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getChatByParticipantsIds } from "../redux/thunks/chatThunks";
import { toggleChatManagerView } from "../redux/slices/chatSlice";
import { SubContact } from "../types/subContact";
import useContact from "./useContact";
import { updateSelectedChat } from "../redux/slices/chatSlice";
import { useEffect } from "react";

import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

export const useChatManager = () => {
  const navigate = useNavigate();
  const token = cookies.get("token");
  const dispatch: AppDispatch = useDispatch();
  const { contact } = useContact();
  const { selectedChat } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
    } else if (contact?._id && !selectedChat) {
      dispatch(getChatByParticipantsIds(contact._id));
    }
  }, [token, navigate, dispatch, contact, selectedChat]);

  useEffect(() => {
    if (contact?.subContacts?.length) {
      const firstSubContact = contact.subContacts[0];
      dispatch(updateSelectedChat(firstSubContact));
    }
  }, [contact, dispatch]);

  const handleChatSelection = (selectedSubContact: SubContact | null) => {
    if (
      contact?._id &&
      selectedSubContact &&
      selectedSubContact !== selectedChat
    ) {
      dispatch(toggleChatManagerView());
      dispatch(getChatByParticipantsIds(contact._id));
    }
    dispatch(updateSelectedChat(selectedSubContact || null));
  };

  return { handleChatSelection };
};
