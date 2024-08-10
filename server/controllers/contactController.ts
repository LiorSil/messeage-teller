import { Request, Response } from "express";
import {
  createContact as createContactService,
  getContactById as getContactByIdService,
  getContacts as getContactsService,
  updateContact as updateContactService,
  deleteContact as deleteContactService,
} from "../services/contactService";

const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await createContactService(req.body);
    res.status(201).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await getContactByIdService(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getContacts = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.query;
    const contacts = await getContactsService();

    if (phoneNumber) {
      const filteredContacts = contacts.filter((contact) =>
        contact.phoneNumber.startsWith(phoneNumber as string)
      );
      return res.status(200).json(filteredContacts);
    } else {
      res.status(200).json(contacts);
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const updateContact = async (req: Request, res: Response) => {
  try {
    const contact = await updateContactService(req.params.id, req.body);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await deleteContactService(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export {
  createContact,
  getContactById,
  getContacts,
  updateContact,
  deleteContact,
};
