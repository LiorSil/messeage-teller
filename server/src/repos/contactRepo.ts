import Contact from "../models/contactModel";
import { IContact } from "../models/model.interfaces";
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
  const contact = await Contact.findById(contactId).exec();

  return contact;
};

const getContactByPhoneNumber = async (phoneNumber: string) => {
  try {
    const contact = await Contact.findOne({ phoneNumber: phoneNumber });
    return contact; 
  } catch (error) {
    console.error("Error finding contact by phone number:", error);
    throw error;
  }
};

const getContactsByName = async (name: string): Promise<IContact[]> => {
  return await Contact.find({ name: { $regex: name, $options: "i" } }).exec();
};

const findContacts = async (query: string): Promise<IContact[]> => {
  return await Contact.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { phoneNumber: { $regex: query, $options: "i" } },
    ],
  }).exec();
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
  getContactsByName,
  findContacts,
  getContacts,
  updateContact,
  deleteContact,
};
