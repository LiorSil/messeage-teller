import contactModel from "../models/contact.model";
import { IContact } from "../interfaces/model.interfaces";
import { isSubContactExist, phoneNumberSchema } from "../utils/validation";
import { PhoneNumber } from "../types/regex.type";

/**
 * Creates a new contact document.
 * @param contactData - The data for the new contact.
 * @returns {Promise<IContact>} - Returns the created contact document.
 */
export const createContact = async (
  contactData: Partial<IContact>
): Promise<IContact> => {
  const contact = new contactModel(contactData);
  return await contact.save();
};

/**
 * Retrieves a contact document by its ID.
 * @param contactId - The ID of the contact document to retrieve.
 * @returns {Promise<IContact | null>} - Returns the contact document or null if not found.
 */
export const getContactById = async (
  contactId: Pick<IContact, "_id">
): Promise<IContact | null> => {
  try {
    return await contactModel.findById(contactId).lean().exec();
  } catch (error) {
    console.error("Error retrieving contact by ID:", error);
    throw new Error("Failed to retrieve contact.");
  }
};


/**
 * Retrieves a contact document by its phone number.
 * @param phoneNumber - The phone number to search for.
 * @returns {Promise<IContact | null>} - Returns the contact document or null if not found.
 */
export const getContactByPhoneNumber = async (
  phoneNumber: PhoneNumber
): Promise<IContact | null> => {
  try {
    return await contactModel.findOne({ phoneNumber }).lean().exec();
  } catch (error) {
    console.error("Error finding contact by phone number:", error);
    throw new Error("Failed to find contact by phone number.");
  }
};


/**
 * Retrieves contact documents by name using a case-insensitive regex search.
 * @param name - The name to search for.
 * @returns {Promise<IContact[]>} - Returns an array of contact documents.
 */
export const getContactsByName = async (name: Pick<IContact, "name">): Promise<IContact[]> => {
  try {
    return await contactModel
      .find({ name: { $regex: name, $options: "i" } })
      .lean()
      .exec();
  } catch (error) {
    console.error("Error finding contacts by name:", error);
    throw new Error("Failed to find contacts by name.");
  }
};

/**
 * Retrieves contact documents by a query, which can be either a phone number or a name.
 * @param query - The query to search for (phone number or name).
 * @returns {Promise<IContact[]>} - Returns an array of contact documents.
 */
export const getContactsByQuery = async (query: string): Promise<IContact[]> => {
  try {
    const isPhoneNumber = await phoneNumberSchema
      .validate(query)
      .then(() => true)
      .catch(() => false);

    const searchField = isPhoneNumber
      ? { phoneNumber: { $regex: query, $options: "i" } }
      : { name: { $regex: query, $options: "i" } };

    return await contactModel.find(searchField).lean().exec();
  } catch (error) {
    console.error("Error finding contacts by query:", error);
    throw new Error("Failed to find contacts by query.");
  }
};


/**
 * Retrieves all contact documents.
 * @returns {Promise<IContact[]>} - Returns an array of all contact documents.
 */
export const getContacts = async (): Promise<IContact[]> => {
  try {
    return await contactModel.find().lean().exec();
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    throw new Error("Failed to retrieve contacts.");
  }
};


/**
 * Updates a contact document with the provided update data.
 * @param contactId - The ID of the contact document to update.
 * @param updateData - The data to update in the contact document.
 * @returns {Promise<IContact | null>} - Returns the updated contact document or null if not found.
 */
export const updateContact = async (
  contactId: Pick<IContact, "_id">,
  updateData: Partial<IContact>
): Promise<IContact | null> => {
  try {
    return await contactModel
      .findByIdAndUpdate(contactId, updateData, { new: true, lean: true })
      .exec();
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error("Failed to update contact.");
  }
};

/**
 * Adds a sub-contact to a contact document if it doesn't already exist.
 * @param contactId - The ID of the contact document to update.
 * @param subContactId - The ID of the sub-contact to add.
 * @returns {Promise<IContact | null>} - Returns the updated contact document or null if the sub-contact already exists.
 */
export const addSubContact = async (
  contactId: Pick<IContact, "_id">,
  subContactId: Pick<IContact, "_id"> 
): Promise<IContact | null> => {
  try {
    const subContactExists = await isSubContactExist(contactId, subContactId);
    if (subContactExists) {
      return null;
    }
    return await contactModel
      .findByIdAndUpdate(
        contactId,
        { $addToSet: { subContacts: { subContactId } } },
        { new: true, upsert: true, lean: true }
      )
      .exec();
  } catch (error) {
    console.error("Error adding sub-contact:", error);
    throw new Error("Failed to add sub-contact.");
  }
};

/**
 * Deletes a contact document by its ID.
 * @param contactId - The ID of the contact document to delete.
 * @returns {Promise<IContact | null>} - Returns the deleted contact document or null if not found.
 */
export const deleteContact = async (
  contactId: Pick<IContact, "_id">
): Promise<IContact | null> => {
  try {
    return await contactModel.findByIdAndDelete(contactId).lean().exec();
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Failed to delete contact.");
  }
};

/**
 * Updates the notification status of a sub-contact within a contact document.
 * @param contactId - The ID of the contact document to update.
 * @param subContactId - The ID of the sub-contact to update.
 * @param isIncomingMessage - The new notification status.
 * @returns {Promise<IContact | null>} - Returns the updated contact document or null if not found.
 */
export const updateNotification = async (
  contactId: Pick<IContact, "_id">, 
  subContactId:  Pick<IContact, "_id"> ,
  isIncomingMessage: boolean
): Promise<IContact | null> => {
  try {
    return await contactModel
      .findOneAndUpdate(
        { _id: contactId, "subContacts.subContactId": subContactId },
        { $set: { "subContacts.$.isIncomingMessage": isIncomingMessage } },
        { new: true, lean: true }
      )
      .exec();
  } catch (error) {
    console.error("Error updating notification:", error);
    throw new Error("Failed to update notification.");
  }
};