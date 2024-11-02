import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getContactChats } from "../redux/thunks/chatThunks";
import { toggleChatManagerView } from "../redux/slices/chatSlice";
import { SubContact } from "../types/subContact";
import useContact from "./useContact";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { updateContact } from "../redux/slices/contactSlice";
import { acknowledgeNotification } from "../redux/thunks/contactThunks";
import { Contact } from "../types/contact";
const cookies = new Cookies();

export const useChatManager = () => {
  const navigate = useNavigate();

  const token = cookies.get("token");
  const dispatch: AppDispatch = useDispatch();
  const { contact } = useContact();

  // Handle unauthenticated access
  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
    }
  }, [token, navigate]);

  const handleChatSelection = async (selectedSubContact: SubContact | null) => {
    if (selectedSubContact && contact) {

      await dispatch(getContactChats({contactId: contact._id, subContact: selectedSubContact}));
      // for mobile view toggle chat manager view
      dispatch(toggleChatManagerView());
      await handleRemoveNotification(contact, selectedSubContact);
    }
  };

  const handleRemoveNotification = async (
    recipient: Contact,
    selectedChat: SubContact
  ) => {
    const updatedSubContacts = recipient.subContacts.map((subContact) =>
      subContact._id === selectedChat._id
        ? { ...subContact, isIncomingMessage: false }
        : subContact
    );
    console.log("updatedSubContacts", updatedSubContacts);

    if(!contact) return;
    dispatch(updateContact({ ...contact, subContacts: updatedSubContacts } ));
    if (selectedChat.isIncomingMessage) {
      dispatch(
        acknowledgeNotification({

          fromId: selectedChat._id,
          recipientId: recipient._id,
        })
      );
    }
  };

  return { handleChatSelection };
};
