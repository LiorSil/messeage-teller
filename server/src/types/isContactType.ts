import { IContact } from "../models/model.interfaces";

export const isContactType = (contact: any): contact is IContact => {
  if (
    contact._id &&
    contact.name &&
    contact.avatar &&
    contact.phoneNumber &&
    contact.subContacts
  ) {
    return true;
  }
  return false;
};
