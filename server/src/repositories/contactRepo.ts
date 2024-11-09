import contactModel from "../models/contactModel";
import { IContact } from "../models/model.interfaces";
import { Types } from "mongoose";
import { isSubContactExist, phoneNumberSchema } from "./validation";

export const createContact = async (
  contactData: Partial<IContact>
): Promise<IContact> => {
  const contact = new contactModel(contactData);
  return await contact.save();
};

export const getContactById = async (
  contactId: Types.ObjectId | string
): Promise<IContact | null> => {
  return await contactModel.findById(contactId).exec();
};

export const getContactByPhoneNumber = async (phoneNumber: string) => {
  try {
    return await contactModel.findOne({ phoneNumber: phoneNumber });
  } catch (error) {
    console.error("Error finding contact by phone number:", error);
    return null;
  }
};

export const getContactsByName = async (name: string): Promise<IContact[]> => {
  return await contactModel
    .find({ name: { $regex: name, $options: "i" } })
    .exec();
};

export const getContactsByQuery = async (
  query: string
): Promise<IContact[]> => {
  const isPhoneNumber = await phoneNumberSchema
    .validate(query)
    .then(() => true)
    .catch(() => false);

  const searchField = isPhoneNumber
    ? { phoneNumber: { $regex: query, $options: "i" } }
    : { name: { $regex: query, $options: "i" } };
  return await contactModel.find(searchField).exec();
};

export const getContacts = async (): Promise<IContact[]> => {
  return await contactModel.find().exec();
};
export const updateContact = async (
  contactId: Types.ObjectId | string,
  updateData: Partial<IContact>
): Promise<IContact | null> => {
  return await contactModel
    .findByIdAndUpdate(contactId, updateData, {
      new: true,
    })
    .exec();
};

export const addSubContact = async (
  contactId: Types.ObjectId,
  subContactId: Types.ObjectId
): Promise<IContact | null> => {
  const subContactsIsAlreadyExist = await isSubContactExist(
    contactId,
    subContactId
  );
  if (subContactsIsAlreadyExist) {
    return null;
  }
  return await contactModel
    .findByIdAndUpdate(
      contactId,
      {
        $addToSet: { subContacts: { subContactId: subContactId } },
      },
      { new: true, upsert: true } // 'upsert: true' to create the contact if it doesn't exist
    )
    .exec();
};

export const deleteContact = async (
  contactId: Types.ObjectId | string
): Promise<IContact | null> => {
  return await contactModel.findByIdAndDelete(contactId).exec();
};

export const updateNotification = async (
  contactId: Types.ObjectId,
  subContactId: Types.ObjectId,
  isIncomingMessage: boolean
): Promise<IContact | null> => {
  return await contactModel.findOneAndUpdate(
    { _id: contactId, "subContacts.subContactId": subContactId },
    { $set: { "subContacts.$.isIncomingMessage": isIncomingMessage } },
    { new: true }
  );
};
