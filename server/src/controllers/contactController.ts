import { Request, Response } from "express";
import contactService from "../services/contactService";
import ns from "../services/notificationService";
import { Types } from "mongoose";


const handleError = (res: Response, error: any) =>
  res.status(400).json({ message: error.message });

const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    handleError(res, error);
  }
};

const getContact = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body.contact;
    const contact = await contactService.getContactByPhoneNumber(phoneNumber);

    if (!contact) return res.status(404).json({ message: "Contact not found" });

    const notifications = await ns.getActiveNotifications(contact._id);
    const notificationFromIds = new Set(
      notifications.map(({ fromId }) => fromId.toString())
    );
    const subContacts = await Promise.all(
      contact.subContacts.map((subContactId) =>
        fetchSubContact(subContactId, notificationFromIds)
      )
    );

    res.status(200).json({
      _id: contact._id,
      name: contact.name,
      avatar: contact.avatar,
      phoneNumber: contact.phoneNumber,
      createdAt: contact.createdAt,
      subContacts,
    });
  } catch (error) {
    handleError(res, error);
  }
};

const fetchSubContact = async (
  subContactId: Types.ObjectId,
  notificationFromIds: Set<string>
) => {
  const fullSubContact = await contactService.getContactById(subContactId);
  if (!fullSubContact) return null;

  const { _id, name, phoneNumber, avatar } = fullSubContact;

  return {
    _id,
    name,
    phoneNumber,
    avatar,
    isIncomingMessage: notificationFromIds.has(_id.toString()),
  };
};

const getContactByPhoneNumber = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;
    const contact = await contactService.getContactByPhoneNumber(phoneNumber);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    handleError(res, error);
  }
};

const findContactsByQuery = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const { phoneNumber } = req.body.contact;

    const contact = await contactService.getContactByPhoneNumber(phoneNumber);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    let contacts = await contactService.findContacts(query);
    const { subContacts: ownedContacts } = contact;

    contacts = contacts.filter(
      (c) =>
        !ownedContacts.some((sc) => sc.equals(c._id)) &&
        c.phoneNumber !== phoneNumber // Filter out self-contact
    );

    const safeContacts = contacts.map(({ name, phoneNumber }, index) => ({
      _id: index,
      name,
      phoneNumber,
      avatar: "",
      lastMessage: "",
    }));

    res.status(200).json(safeContacts);
  } catch (error) {
    handleError(res, error);
  }
};

const addSubContact = async (req: Request, res: Response) => {
  try {
    const { phoneNumber: contactPhoneNumber } = req.body.contact;
    const { contactIdOrNumber } = req.body;

    const contact = await contactService.getContactByPhoneNumber(
      contactPhoneNumber
    );
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    let subContact =
      (await contactService.getContactByPhoneNumber(contactIdOrNumber)) ||
      (await contactService.getContactById(contactIdOrNumber));

    if (!subContact)
      return res.status(404).json({ message: "Sub-contact not found" });

    if (!contact.subContacts.some((sc) => sc.equals(subContact._id))) {
      contact.subContacts.push(subContact._id);
      await contactService.updateContact(contact._id, contact);
    }

    res.status(200).json(contact);
  } catch (error) {
    handleError(res, error);
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body.contact;
    const contact = await contactService.getContactByPhoneNumber(phoneNumber);

    if (!contact) return res.status(404).json({ message: "Contact not found" });

    Object.assign(contact, req.body);
    await contactService.updateContact(contact._id, contact);

    res.status(200).json(contact);
  } catch (error) {
    handleError(res, error);
  }
};

export default {
  createContact,
  getContact,
  getContactByPhoneNumber,
  findContactsByQuery,
  addSubContact,
  updateProfile,
};
