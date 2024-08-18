import { Request, Response } from "express";

import { Schema } from "mongoose";
import contactService from "../services/contactService";
import Contact, { IContact, ISubContact } from "../models/contactModel";

const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getContact = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body.contact;

  try {
    const contact = await contactService.getContactByPhoneNumber(phoneNumber);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getContactByPhoneNumber = async (req: Request, res: Response) => {
  const { phoneNumber } = req.params;

  try {
    const contact = await contactService.getContactByPhoneNumber(
      phoneNumber as string
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const findContactsByQuery = async (req: Request, res: Response) => {
  const { query } = req.params;

  try {
    const contacts = await contactService.findContacts(query as string);

    if (!contacts) {
      return res.status(404).json({ message: "Contacts not found" });
    }
    const safeContacts = contacts.map((contact, index) => {
      const { name, phoneNumber } = contact;
      return { id: index, name, phoneNumber };
    });

    res.status(200).json(safeContacts);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const addSubContact = async (req: Request, res: Response) => {
  const { phoneNumber: contactPhoneNumber } = req.body.contact;
  const { phoneNumber: newSubContactNumber } = req.body;
  console.log("contact Phone Number:", contactPhoneNumber);
  console.log("newSubContactNumber", newSubContactNumber);

  try {
    const contact: IContact | null =
      await contactService.getContactByPhoneNumber(contactPhoneNumber);

    let subContact: IContact | null =
      await contactService.getContactByPhoneNumber(newSubContactNumber);

    if (!subContact) {
      return res.status(404).json({ message: "New contact not found" });
    }

    if (!contact) {
      return res.status(404).json({ message: "Self contact not found" });
    }

    const newSubContact: ISubContact = {
      _id: subContact._id as Schema.Types.ObjectId,
      name: subContact.name,
      phoneNumber: subContact.phoneNumber,
    } as ISubContact;

    contact.contacts.push(newSubContact);
    const id = contact._id as string;
    await contactService.updateContact(id, contact);
    res.status(200).json(contact);
  } catch (err: any) {
    // Handle errors and return an appropriate response
    res.status(400).json({ message: err.message });
  }
};

export {
  createContact,
  getContact,
  getContactByPhoneNumber,
  addSubContact,
  findContactsByQuery,
};
