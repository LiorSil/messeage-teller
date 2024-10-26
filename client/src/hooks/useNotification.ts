import { useDispatch } from "react-redux";
import { updateContact } from "../redux/slices/contactSlice";
import { Message } from "../types/message";
import { Contact } from "../types/contact";
import { SubContact } from "../types/subContact";

export const useNotification = () => {
  const dispatch = useDispatch();

  const createNotification = (message: Message, contact: Contact) => {
    if (!contact.subContacts) return;

    const updatedSubContacts = contact.subContacts.map(
      (subContact: SubContact) =>
        subContact._id === message.fromId
          ? { ...subContact, isIncomingMessage: true }
          : subContact
    );

    const updatedContact = { ...contact, subContacts: updatedSubContacts };
    dispatch(updateContact(updatedContact));
  };

  return { createNotification };
};
