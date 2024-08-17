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

const getContactByPhoneNumber = async (
  phoneNumber: string
): Promise<IContact | null> => {
  return await Contact.findOne({ phoneNumber }).exec();
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
