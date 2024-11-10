import { useDispatch } from "react-redux";
import { updateContact } from "../redux/slices/contactSlice";
import { Message } from "../types/message";
import { Contact } from "../types/contact";
import { SubContact } from "../types/subContact";
import {useContact} from "./useContact";

export const useNotification = () => {
  const dispatch = useDispatch();
  const { contact } = useContact();

  const createNotification = (message: Message) => {
    const updatedSubContacts = contact?.subContacts.map(
      (subContact: SubContact) =>
        subContact._id === message.fromId
          ? { ...subContact, isIncomingMessage: true }
          : subContact
    );

    const updatedContact = { ...contact, subContacts: updatedSubContacts };
    dispatch(updateContact(updatedContact as Contact));
  };

  return  createNotification ;
};
