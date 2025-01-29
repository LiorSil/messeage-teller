import { Types } from "mongoose";
import contactModel from "../models/contact.model";
import * as yup from "yup";
import { IContact } from "../interfaces/model.interfaces";

/**
 * Validates if a subContactId already exists in the subContacts array of a specific contact.
 * @param partialPhoneNumber - The phone number to validate.
 */
export const phoneNumberSchema = yup
  .string()
  .matches(
    /^05\d{0,8}$/,
    "Phone number must start with '05' and contain up to 10 digits."
  )
  .required();

/**
 * Validates if a subContactId already exists in the subContacts array of a specific contact.
 * @param contactId - The ID of the contact document to check.
 * @param subContactId - The subContactId to check for existence.
 * @returns {Promise<boolean>} - Returns true if unique, false if it already exists.
 */

export const isSubContactExist = async (
  contactId: Pick<IContact, "_id">,
  subContactId: Pick<IContact, "_id">
): Promise<boolean> => {
  const existingContact = await contactModel.findOne({
    _id: contactId,
    "subContacts.subContactId": subContactId,
  });
  return existingContact ? true : false;
};
