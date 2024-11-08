import {
    createContact,
  getContactsByQuery,
  updateContact,
  addSubContact,
  getContactById,
} from "../repositories/contactRepo";
import { IContact, ISubContact } from "../models/model.interfaces";
import { Types } from "mongoose";
import { getNotificationsService } from "./notificationService";

export const createContactService = async (
  contactData: Partial<IContact>
): Promise<IContact> => {
  return await createContact(contactData);
};

export const getContactsByQueryService = async (
  query: string
): Promise<IContact[]> => {
  return await getContactsByQuery(query);
};

export const updateContactService = async (
  contactId: Types.ObjectId | string,
  updateData: Partial<IContact>
): Promise<IContact | null> => {
  return await updateContact(contactId, updateData);
};

export const addSubContactService = async (
  contactId: Types.ObjectId,
  subContactId: Types.ObjectId
): Promise<IContact | null> => await addSubContact(contactId, subContactId);

export const getContactByIdService = async (
  subContactId: Types.ObjectId | string
) => {
  const fullSubContact = await getContactById(subContactId);
  if (!fullSubContact) return null;

  const { _id, name, phoneNumber, avatar } = fullSubContact;

  return {
    _id,
    name,
    phoneNumber,
    avatar,
  };
};

export const buildClientContactDataService = async (contact: IContact) => {
  try {
    // Fetch all sub-contacts details asynchronously
    const subContacts = await Promise.all(
      contact.subContacts.map((subContact: ISubContact) =>
        getContactByIdService(subContact.subContactId)
      )
    );
    const notificationsIds = getNotificationsService(contact._id);
    // Return the data in the specified format
    return {
      status: 200,
      data: {
        _id: contact._id,
        name: contact.name,
        avatar: contact.avatar,
        phoneNumber: contact.phoneNumber,
        createdAt: contact.createdAt,
        subContacts,
        notificationsIds,
      },
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Error fetching contact data", error },
    };
  }
};

export const findContactsByQueryService = async (
  loggedInContact: IContact,
  query: string
) => {
  const contacts = await getContactsByQuery(query);
  return contacts
    .filter(
      (foundContact) =>
        !foundContact._id.equals(loggedInContact._id) &&
        !loggedInContact.subContacts.some((subContact: ISubContact) =>
          subContact.subContactId.equals(foundContact._id)
        )
    )
    .map(({ _id, name, phoneNumber, avatar }) => ({
      _id,
      name,
      phoneNumber,
      avatar,
      //TODO: Add last message to the response
      lastMessage: "",
    }));
};
