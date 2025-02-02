import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getSelectedChatMessages } from "../redux/thunks/chatThunks";
import { toggleChatManagerView } from "../redux/slices/chatSlice";
import { SubContact } from "../types/subContact";
import {useContact} from "./useContact";
import { updateContact } from "../redux/slices/contactSlice";
import { acknowledgeNotification } from "../redux/thunks/contactThunks";


export const useChatManager = () => {

  const dispatch: AppDispatch = useDispatch();
  const { contact } = useContact();



  const handleChatSelection = async (selectedSubContact: SubContact | null) => {
    if (selectedSubContact ) {
      await dispatch(
        getSelectedChatMessages({
          subContact: selectedSubContact,
        }),
      );
      // for mobile view toggle chat manager view
      dispatch(toggleChatManagerView());
      await handleRemoveNotification( selectedSubContact);
    }
  };

  const handleRemoveNotification = async (
    selectedChat: SubContact,
  ) => {
    if (!contact) return;
    const updatedSubContacts = contact.subContacts.map((subContact) =>
      subContact.subContactId === selectedChat.subContactId
        ? { ...subContact, isIncomingMessage: false }
        : subContact
    );

    dispatch(updateContact({ ...contact, subContacts: updatedSubContacts }));
    if (selectedChat.isIncomingMessage) {
      dispatch(
        acknowledgeNotification({
          contactId: contact._id,
          subContactId: selectedChat.subContactId,
        })
      );
    }
  };

  return { handleChatSelection };
};
