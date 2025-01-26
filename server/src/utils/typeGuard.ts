import { Types } from "mongoose";
import { IContact } from "../interfaces/model.interfaces";
import { ClientSubContact } from "../types/client.type";


/**
 * Type guard function to check if an object is of type IContact.
 * @param contact - The object to check.
 * @returns {boolean} - True if the object is an IContact, false otherwise.
 */
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


