import { IContact, ISubContact } from "../interfaces/model.interfaces";
import { ClientSubContact, ContactSubContact } from "../types/client.type";
import { sortSubContactsByLatestChats } from "./chat.service";
import {
  createContact,
  getContactsByQuery,
  updateContact,
  addSubContact,
  getContactById,
} from "../repositories/contact.repository";
import { Types } from "mongoose";

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
  contactId: Types.ObjectId,
  updateData: Partial<IContact>
): Promise<IContact | null> => {
  return await updateContact(contactId, updateData);
};

export const addSubContactService = async (
  contactId: Types.ObjectId,
  subContactId: Types.ObjectId
): Promise<ClientSubContact | null> => {
  await addSubContact(contactId, subContactId);
  return await getContactByIdService(subContactId);
};

export const deleteSubContact = async (
  contact: IContact,
  subContactId: Types.ObjectId
): Promise<ClientSubContact | null> => {
  contact.subContacts = contact.subContacts.filter(
    (subContact) =>
      subContact.subContactId.toString() !== subContactId.toString()
  );
  const updatedContact = await updateContact(contact._id, { ...contact });
  return updatedContact;
};

export const getContactByIdService = async (
  subContactId: Types.ObjectId
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

export const getContactSubContact = async (
  contactId: Types.ObjectId,
  subContactId: Types.ObjectId
): Promise<ContactSubContact | null> => {
  const contact = await getContactById(contactId);
  const subContactAsSubContact = contact?.subContacts.find((sc) =>
    sc.subContactId.equals(subContactId)
  );
  const subContactAsContact = await getContactById(subContactId);
  if (!subContactAsSubContact || !subContactAsContact) return null;
  const subContact: ContactSubContact = {
    _id: subContactAsContact._id,
    name: subContactAsContact.name,
    phoneNumber: subContactAsContact.phoneNumber,
    avatar: subContactAsContact.avatar,
    lastMessageTime: subContactAsSubContact.lastMessageTime,
    isIncomingMessage: subContactAsSubContact.isIncomingMessage as boolean,
  };
  return subContact;
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
