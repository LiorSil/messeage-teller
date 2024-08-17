import Contact, { IContact } from "../models/contactModel";
import { Types } from "mongoose";

const createContact = async (
  contactData: Partial<IContact>
): Promise<IContact> => {
  const contact = new Contact(contactData);
  return await contact.save();
};

const getContactById = async (
  contactId: Types.ObjectId | string
): Promise<IContact | null> => {
  return await Contact.findById(contactId).exec();
};

const getContactByPhoneNumber = async (phoneNumber: string) => {
  try {
    const contact = await Contact.findOne({ phoneNumber: phoneNumber });
    return contact; // This will be the document if found, or null if not found
  } catch (error) {
    console.error("Error finding contact by phone number:", error);
    throw error;
  }
};

const getContacts = async (): Promise<IContact[]> => {
  return await Contact.find().exec();
};

const updateContact = async (
  contactId: Types.ObjectId | string,
  updateData: Partial<IContact>
): Promise<IContact | null> => {
  return await Contact.findByIdAndUpdate(contactId, updateData, {
    new: true,
  }).exec();
};

const deleteContact = async (
  contactId: Types.ObjectId | string
): Promise<IContact | null> => {
  return await Contact.findByIdAndDelete(contactId).exec();
};

export default {
  createContact,
  getContactById,
  getContactByPhoneNumber,
  getContacts,
  updateContact,
  deleteContact,
};
