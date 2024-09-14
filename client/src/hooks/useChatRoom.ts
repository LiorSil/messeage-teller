import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import useContact from "./useContact";
import { SubContact } from "../types/subContact";
import { updateSelectedChat } from "../redux/slices/chatSlice";
import { getChatByParticipantsIds } from "../redux/thunks/chatThunks";

export const useChatRoom = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { contact } = useContact();

  const token = useSelector((state: RootState) => state.auth.token);
  const { selectedChat, chats, messages } = useSelector(
    (state: RootState) => state.chat
  );
  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    let existingToken = cookies.get("token");

    if (!existingToken && token) {
      cookies.set("token", token, {
        path: "/",
        sameSite: "none",
        secure: true,
      });
      existingToken = token;
    }

    if (!existingToken) {
      navigate("/unauthorized");
    }
    if (contact?._id) dispatch(getChatByParticipantsIds(contact._id));
  }, [token, cookies, navigate, dispatch, contact]);

  const baseClass =
    "w-full flex flex-col h-screen bg-app-palette-sap-green-light-+40";

  const getClassNames = useMemo(
    () => (isSelected: boolean, mdWidth: string) => {
      return `${baseClass} ${mdWidth} ${isSelected ? "flex" : "hidden md:flex"}`;
    },
    [baseClass]
  );

  useEffect(() => {
    //default to the first chat room
    const selectedSubContact = contact?.subContacts?.[0];

    if (selectedSubContact) {
      dispatch(updateSelectedChat(selectedSubContact));
    } else {
      dispatch(updateSelectedChat(null)); // Reset to null if name is invalid
    }
  }, [contact, dispatch, token]);

  const handleChatSelection = (selectedSubContact: SubContact | null) => {
    if (selectedSubContact) {
      dispatch(updateSelectedChat(selectedSubContact));
    } else {
      dispatch(updateSelectedChat(null)); // Reset to null if chatRoom is invalid
    }
  };

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
