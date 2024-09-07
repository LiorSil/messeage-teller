import { Request, Response } from "express";
import { Schema, Types } from "mongoose";

import contactService from "../services/contactService";
import { IContact, IMessage, ISubContact } from "../models/model.interfaces";
import chatService from "../services/chatService";

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

  const contact = await contactService.getContactByPhoneNumber(
    req.body.contact.phoneNumber
  );

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const { subContacts: ownedContacts } = contact;

  try {
    let contacts = await contactService.findContacts(query as string);

    contacts = contacts.filter((contact) => {
      return !ownedContacts.some(
        (subContact: ISubContact) =>
          subContact.phoneNumber === contact.phoneNumber
      );
    });
    //filter out self contact
    contacts = contacts.filter(
      (contact) => contact.phoneNumber !== req.body.contact.phoneNumber
    );

    if (!contacts) {
      return res.status(404).json({ message: "Contacts not found" });
    }
    const safeContacts = contacts.map((contact, index) => {
      const { name, phoneNumber } = contact;
      return { _id: index, name, phoneNumber, avatar: "", lastMessage: "" };
    });

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
    const isSubContactAlreadyAdded = contact.subContacts.some(
      (existingSubContact) =>
        existingSubContact.phoneNumber === newSubContactNumber
    );

    if (isSubContactAlreadyAdded) {
      return res.status(400).json({ message: "Sub-contact already exists" });
    }

    // Create new sub-contact to add
    const newSubContact: ISubContact = {
      _id: subContact._id,
      name: subContact.name,
      phoneNumber: subContact.phoneNumber,
      avatar: subContact.avatar || "",
      lastMessage: "",
    } as ISubContact;

    contact.subContacts.push(newSubContact);
    const id = contact._id;
    await contactService.updateContact(id, contact);

    //create a chat between the two contacts
    const chat = await chatService.createChat([contact._id, subContact._id]);
    console.log("chat created:", chat);

    res.status(200).json(contact);
  } catch (err: any) {
    // Handle errors and return an appropriate response
    res.status(400).json({ message: err.message });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const { phoneNumber } = req.body.contact;

  try {
    const contact = await contactService.getContactByPhoneNumber(phoneNumber);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    Object.assign(contact, data);

    const id = contact._id;
    await contactService.updateContact(id, contact);

    res.status(200).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  createContact,
  getContact,
  getContactByPhoneNumber,
  addSubContact,
  findContactsByQuery,
  updateProfile,
};
