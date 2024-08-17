import contactRepo from "../repos/contactRepo";
import { IContact } from "../models/contactModel";
import { Types } from "mongoose";

const createContact = async (
  contactData: Partial<IContact>
): Promise<IContact> => {
  return await contactRepo.createContact(contactData);
};

const getContactById = async (
  contactId: Types.ObjectId | string
): Promise<IContact | null> => {
  return await contactRepo.getContactById(contactId);
};

const getContactByPhoneNumber = async (
  phoneNumber: string
): Promise<IContact | null> => {
  return await contactRepo.getContactByPhoneNumber(phoneNumber);
};

const getContacts = async (): Promise<IContact[]> => {
  return await contactRepo.getContacts();
};

const updateContact = async (
  contactId: Types.ObjectId | string,
  updateData: Partial<IContact>
): Promise<IContact | null> => {
  return await contactRepo.updateContact(contactId, updateData);
};

const deleteContact = async (
  contactId: Types.ObjectId | string
): Promise<IContact | null> => {
  return await contactRepo.deleteContact(contactId);
};

export default {
  createContact,
  getContactById,
  getContactByPhoneNumber,
  getContacts,
  updateContact,
  deleteContact,
};
