import contactRepo from "../repos/contactRepo";
import { IContact } from "../models/model.interfaces";
import { Types } from "mongoose";

const createContact = async (
  contactData: Partial<IContact>
): Promise<IContact> => {
  return await contactRepo.createContact(contactData);
};

const getContactById = async (
  contactId: Types.ObjectId | string
): Promise<IContact | null> => {
  const contact = await contactRepo.getContactById(contactId);

  return contact;
};

const getContactByPhoneNumber = async (
  phoneNumber: string
): Promise<IContact | null> => {
  return await contactRepo.getContactByPhoneNumber(phoneNumber);
};

const getContactsByPhoneNumber = async (
  phoneNumbers: string[]
): Promise<IContact[] | null> => {
  const contacts = await Promise.all(
    phoneNumbers.map(async (phoneNumber) => {
      return await contactRepo.getContactByPhoneNumber(phoneNumber);
    })
  );

  // If any contact is null, return null for the entire operation
  if (contacts.some((contact) => contact === null)) {
    return null;
  }
  // Otherwise, return the valid contacts
  return contacts as IContact[];
};

const getContactsByName = async (name: string): Promise<IContact[] | null> => {
  return await contactRepo.getContactsByName(name);
};

const findContacts = async (query: string): Promise<IContact[]> => {
  return await contactRepo.findContacts(query);
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
  getContactsByPhoneNumber,
  getContactsByName,
  findContacts,
  getContacts,
  updateContact,
  deleteContact,
};
