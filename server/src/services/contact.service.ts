import {
  createContact,
  getContactsByQuery,
  updateContact,
  addSubContact,
  getContactById,
} from "../repositories/contact.repository";
import { IContact, ISubContact } from "../interfaces/model.interfaces";
import { Types } from "mongoose";
import { ClientSubContact } from "../types/client.type";
import { sortSubContactsByLatestChats } from "./chat.service";
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
  contactId: Pick<IContact, "_id">,
  updateData: Partial<IContact>
): Promise<IContact | null> => {
  return await updateContact(contactId, updateData);
};

export const addSubContactService = async (
  contactId: Pick<IContact, "_id">,
  subContactId: Pick<IContact, "_id">
): Promise<ClientSubContact | null> => {
  await addSubContact(contactId, subContactId);

  return await getContactByIdService(subContactId);
};

export const getContactByIdService = async (
  subContactId: Pick<IContact, "_id">
): Promise<ClientSubContact | null> => {
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
    const subContacts = await sortSubContactsByLatestChats(contact);

    return {
      status: 200,
      data: {
        _id: contact._id,
        name: contact.name,
        avatar: contact.avatar,
        phoneNumber: contact.phoneNumber,
        createdAt: contact.createdAt,
        subContacts,
      },
    };
  } catch (error) {
    return {
      status: 500,
      data: { message: "Error fetching contact data", error },
    };
  }
};
/*
export const findContactsByQueryService = async (
  contact: IContact,
  query: string
) => {


 const queriedContacts = await getContactsByQuery(query);
  return queriedContacts
    .filter(
      (queriedContact) =>
        !queriedContact._id.equals(contact._id) &&
        !contact.subContacts.some((subContact: ISubContact) =>
          subContact.subContactId.equals(queriedContact._id)
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

*/

export const findContactsByQueryService = async (
  contact: IContact,
  query: string
): Promise<Pick<IContact, "_id" | "name" | "phoneNumber" | "avatar">[]> => {
  const queriedContacts = await getContactsByQuery(query);

  const contactIds = new Set([
    contact._id.toString(),
    ...contact.subContacts.map((subContact) =>
      subContact.subContactId.toString()
    ),
  ]);

  return queriedContacts
    .filter((queriedContact) => !contactIds.has(queriedContact._id.toString()))
    .map(({ _id, name, phoneNumber, avatar }) => ({
      _id,
      name,
      phoneNumber,
      avatar,
      lastMessage: "",
    }));
  
};