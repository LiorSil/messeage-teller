import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getSelectedChatMessages } from "../redux/thunks/chatThunks";
import { toggleChatManagerView } from "../redux/slices/chatSlice";
import { SubContact } from "../types/subContact";
import useContact from "./useContact";

import { updateContact } from "../redux/slices/contactSlice";
import { acknowledgeNotification } from "../redux/thunks/contactThunks";
import { Contact } from "../types/contact";


export const useChatManager = () => {

  const dispatch: AppDispatch = useDispatch();
  const { contact } = useContact();



  const handleChatSelection = async (selectedSubContact: SubContact | null) => {
    if (selectedSubContact && contact) {
      await dispatch(
        getSelectedChatMessages({
          subContact: selectedSubContact,
        }),
      );
      // for mobile view toggle chat manager view
      dispatch(toggleChatManagerView());
      await handleRemoveNotification(contact, selectedSubContact);
    }
  };

  const handleRemoveNotification = async (
    recipient: Contact,
    selectedChat: SubContact,
  ) => {
    const updatedSubContacts = recipient.subContacts.map((subContact) =>
      subContact._id === selectedChat._id
        ? { ...subContact, isIncomingMessage: false }
        : subContact,
    );

    if (!contact) return;
    dispatch(updateContact({ ...contact, subContacts: updatedSubContacts }));
    if (selectedChat.isIncomingMessage) {
      dispatch(
        acknowledgeNotification({
          contactId: contact._id,
          subContactId: selectedChat._id,
        })
      );
    }
  };

  return { handleChatSelection };
};
