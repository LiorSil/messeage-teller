import { Request, Response } from "express";
import contactService from "../services/contactService";
import ns from "../services/notificationService";
import { Types } from "mongoose";
import {ISubContact} from "../models/model.interfaces";


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
    const { contact } = await req.body;
    const notifications = await ns.getActiveNotifications(contact._id);

    const notificationFromIds = new Set(
      notifications.map(({ fromId }) => fromId.toString())
    );
    const subContacts = await Promise.all(
      contact.subContacts.map((subContact: ISubContact) =>
        fetchSubContact(subContact.subContactId, notificationFromIds)
      )
    );
    console.log("subContacts",  subContacts);

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
    console.log("query", query);

    const contact = await contactService.getContactByPhoneNumber(phoneNumber);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    let contacts = await contactService.getContactsByName(query);
    const { subContacts: ownedContacts } = contact;

    contacts = contacts.filter(
      (c) =>
        !ownedContacts.some((sc) => sc.equals(c._id)) &&
        c.phoneNumber !== phoneNumber // Filter out self-contact
    );
    const safeContacts = contacts.map(({ _id, name, phoneNumber,avatar }) => ({
      _id,
      name,
      phoneNumber,
      avatar,
      lastMessage: "",
    }));

    res.status(200).json(safeContacts);
  } catch (error) {
    handleError(res, error);
  }
};

const addSubContact = async (req: Request, res: Response) => {
  try {
    const { contact } = req.body.contact;
    const { subContactId } = req.body;

    await contactService.getContactById(subContactId);
    const success = await contactService.addSubContact(contact._id, subContactId);

    res.status(200).json(success);
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
