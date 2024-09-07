import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import useContact from "./useContact";
import { SubContact } from "../types/subContact";
import { updateSelectedChat } from "../redux/slices/chatSlice";

export const useChatRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { contact } = useContact();

  //const [selectedChat, setSelectedChat] = useState<SubContact | null>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
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
  }, [token, cookies, navigate]);

  const baseClass =
    "w-full flex flex-col h-screen bg-app-palette-sap-green-light-+40";

  const getClassNames = useMemo(
    () => (isSelected: boolean, mdWidth: string) => {
      return `${baseClass} ${mdWidth} ${isSelected ? "flex" : "hidden md:flex"}`;
    },
    [baseClass]
  );

  useEffect(() => {
    const selectedSubContact = contact?.subContacts?.[0];
    console.log("selectedSubContact", selectedSubContact);

    if (selectedSubContact) {
      console.log("triggered");
      dispatch(updateSelectedChat(selectedSubContact));
    } else {
      dispatch(updateSelectedChat(null)); // Reset to null if name is invalid
    }
  }, [contact, dispatch]);

  const handleChatSelection = (selectedSubContact: SubContact | null) => {
    if (selectedSubContact) {
      dispatch(updateSelectedChat(selectedSubContact));
    } else {
      dispatch(updateSelectedChat(null)); // Reset to null if chatRoom is invalid
    }
  };

  return { contact, selectedChat, handleChatSelection, getClassNames, token };
};
