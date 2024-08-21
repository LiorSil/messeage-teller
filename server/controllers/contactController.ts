import { Request, Response } from "express";

import { Schema } from "mongoose";
import contactService from "../services/contactService";
import Contact, { IContact, ISubContact } from "../models/contactModel";
import { log } from "console";

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
  console.log("Query: ", query);
  const contact = await contactService.getContactByPhoneNumber(
    req.body.contact.phoneNumber
  );

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const { contacts: ownedContacts } = contact;

  try {
    let contacts = await contactService.findContacts(query as string);
    // Filter out the contacts that are already in the current contact's contacts
    contacts = contacts.filter((contact) => {
      return !ownedContacts.some(
        (subContact) => subContact.phoneNumber === contact.phoneNumber
      );
    });

    if (!contacts) {
      return res.status(404).json({ message: "Contacts not found" });
    }
    const safeContacts = contacts.map((contact, index) => {
      const { name, phoneNumber } = contact;
      return { _id: index, name, phoneNumber, imageUrl: "", lastMessage: "" };
    });

    console.log("Safe contacts: ", safeContacts);

    res.status(200).json(safeContacts);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const addSubContact = async (req: Request, res: Response) => {
  const { phoneNumber: contactPhoneNumber } = req.body.contact;
  const { phoneNumber: newSubContactNumber } = req.body;

  try {
    const contact: IContact | null =
      await contactService.getContactByPhoneNumber(contactPhoneNumber);
    const subContact: IContact | null =
      await contactService.getContactByPhoneNumber(newSubContactNumber);

    if (!subContact) {
      return res.status(404).json({ message: "New contact not found" });
    }

    if (!contact) {
      return res.status(404).json({ message: "Self contact not found" });
    }

    // Filter out the existing sub-contact from the contacts array
    const isSubContactAlreadyAdded = contact.contacts.some(
      (existingSubContact) =>
        existingSubContact.phoneNumber === newSubContactNumber
    );

    if (isSubContactAlreadyAdded) {
      return res.status(400).json({ message: "Sub-contact already exists" });
    }

    // Create new sub-contact to add
    const newSubContact: ISubContact = {
      _id: subContact._id as Schema.Types.ObjectId,
      name: subContact.name,
      phoneNumber: subContact.phoneNumber,
      imageUrl: subContact.imageUrl || "",
      lastMessage: "",
    } as ISubContact;

    // Add the new sub-contact to the contacts array
    contact.contacts.push(newSubContact);

    // Update the contact in the database
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
